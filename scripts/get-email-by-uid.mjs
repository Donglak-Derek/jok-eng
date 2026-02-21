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

async function getAdminEmail() {
    const oldUid = "Hx4sxBjGaLST6c3MRWtrKn60c702";
    try {
        const userRecord = await getAuth().getUser(oldUid);
        console.log(`The old Admin UID belongs to:`);
        console.log(`EMAIL = ${userRecord.email}`);
        process.exit(0);
    } catch (error) {
        console.log('Error fetching user data:', error.message);
        process.exit(1);
    }
}

getAdminEmail();
