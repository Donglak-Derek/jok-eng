import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

try {
    initializeApp({ credential: cert(serviceAccount) });
} catch (error) {
    if (!/already exists/.test(error.message)) {
        console.error('Firebase initialization error');
    }
}

async function getAdminUid() {
    try {
        const userRecord = await getAuth().getUserByEmail('admin@jok-eng.com');
        console.log(`Successfully found user: admin@jok-eng.com`);
        console.log(`NEW_ADMIN_UID=${userRecord.uid}`);
        process.exit(0);
    } catch (error) {
        console.log('Error fetching user data:', error.message);
        process.exit(1);
    }
}

getAdminUid();
