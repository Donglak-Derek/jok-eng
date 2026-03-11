const fs = require('fs');
const path = require('path');
const { initializeApp } = require('firebase/app');
const { getFirestore, doc, getDoc } = require('firebase/firestore');
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const config = {};
['API_KEY', 'AUTH_DOMAIN', 'PROJECT_ID', 'STORAGE_BUCKET', 'MESSAGING_SENDER_ID', 'APP_ID'].forEach(key => {
  const match = envContent.match(new RegExp(`NEXT_PUBLIC_FIREBASE_${key}=(.*)`));
  if (match) config[key.replace(/_([a-z])/g, g => g[1].toUpperCase()).replace(/^./, c => c.toLowerCase())] = match[1].trim().replace(/['"]/g, '');
});

const app = initializeApp({
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId
});
const db = getFirestore(app);

(async () => {
  const docRef = doc(db, 'users/jok-eng-official/scenarios/video_diagnostic_greeting');
  const snap = await getDoc(docRef);
  console.log(JSON.stringify(snap.data(), null, 2));
  process.exit(0);
})();
