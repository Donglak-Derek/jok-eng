import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { initializeApp, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SRC_DATA_DIR = path.join(__dirname, '../src/data');

const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

try {
    initializeApp({ 
        credential: cert(serviceAccount),
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
    });
} catch (error) {
    if (!/already exists/.test(error.message)) {
        console.error('Firebase initialization error');
    }
}

const BUCKET_NAME = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'jok-eng.firebasestorage.app';

function computeHash(text, voice = 'en-US-AriaNeural') {
    let unescaped = text.replace(/\\"/g, '"').replace(/\\'/g, "'");
    let clean = unescaped.replace(/\[|\]/g, "");
    clean = clean.replace(/^You:\s*/i, "");
    return crypto.createHash("md5").update(`${clean}_${voice}`).digest("hex");
}

async function fetchValidHashes() {
    console.log("Fetching list of existing cached audio files from Firebase Storage...");
    const bucket = getStorage().bucket();
    const [files] = await bucket.getFiles({ prefix: 'tts_cache/' });
    const validHashes = new Set();
    
    files.forEach(file => {
        // e.g. tts_cache/af9b833707710c1fd26142351031075f.mp3
        const match = file.name.match(/tts_cache\/(.+?)\.mp3/);
        if (match) {
            validHashes.add(match[1]);
        }
    });

    console.log(`Found ${validHashes.size} pre-generated MP3 files in storage.`);
    return validHashes;
}

async function run() {
    const validHashes = await fetchValidHashes();
    let totalInjections = 0;

    function processFile(filePath) {
        if (!filePath.endsWith('.ts')) return;
        if (filePath.endsWith('index.ts') || filePath.endsWith('categories.ts')) return;

        let content = fs.readFileSync(filePath, 'utf8');
        let modifications = 0;

        let lines = content.split('\n');
        let newLines = [];

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            newLines.push(line);

            let match = line.match(/^(\s*)(en|phrase):\s*(["'`])(.*)\3\s*,?\s*$/);
            
            if (match) {
                let indent = match[1];
                let rawStr = match[4];
                
                if (i + 1 < lines.length && lines[i+1].includes('audioUrl:')) {
                    continue;
                }

                const hash = computeHash(rawStr);
                
                if (validHashes.has(hash)) {
                    const url = `https://firebasestorage.googleapis.com/v0/b/${BUCKET_NAME}/o/tts_cache%2F${hash}.mp3?alt=media`;
                    modifications++;
                    newLines.push(`${indent}audioUrl: "${url}",`);
                }
            }
        }

        if (modifications > 0) {
            fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
            totalInjections += modifications;
            console.log(`Re-connected ${modifications} audio files in ${path.basename(filePath)}`);
        }
    }

    function walkDir(dir) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                walkDir(fullPath);
            } else {
                processFile(fullPath);
            }
        }
    }

    console.log(`Scanning static scripts in ${SRC_DATA_DIR} to re-connect strictly existing audio...`);
    walkDir(SRC_DATA_DIR);
    console.log(`Audio re-connection complete! Successfully mapped ${totalInjections} existing files.`);
    process.exit(0);
}

run().catch(e => {
    console.error(e);
    process.exit(1);
});
