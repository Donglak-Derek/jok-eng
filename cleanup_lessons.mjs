import admin from 'firebase-admin';

const serviceAccount = {
    projectId: "jok-eng",
    clientEmail: "firebase-adminsdk-fbsvc@jok-eng.iam.gserviceaccount.com",
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC9kpCUzqsFTBEw\n+aKEmiPwIOU7CcNY9QNFmVZsdNWDFFKn58e7zUWVWare6F5ho1mNrZodVl1rUA6E\n7CKhx/7ylxzrQXTVoIDY/fCHCqDMd2RGoO6+8TWn4LqjVH8Pb+qfOJBO9ePkA0Fy\nxWhVNY4/SWKWufgsxCgxmr4QPt5Y2peVyOhEAk/CG7162WFrz69p/88I9xUCHPhH\nMVOdgZhJF+WdHrnvseqz1wS51E9eCEbOEqjs/7rO+LWY0K/rXMzydvgCz7q/Yo/K\nVGXe6mHNsCZw9AXB+d+Ptz0SKpsaAqvES5sImlZxch0uXuXZGlgethwLGT1g+jCg\ndfxrpe9VAgMBAAECggEAHL4Kls1I58ozNxI6XlGCjmdmag+eYy/u2ZAYpuQF9VRQ\n/e0p/uLuIGlSe26O1M3wB4ehPL559onSUbv9ujq5AG4B7/diL/ugXYYPAGKPo8Cc\nXwsKd7/Zq0Tq91WZ2CzXTWHFm3sznMATncOpgHXYxeaqAIFcy+jH0VGNbKgjjSQA\nfEa4OxjXjUfq39Jpjoc4QK8gTEPhG/BdaEI5uzZWnApz2B9edQMdgozUvUovMwVX\nAFVln0HVbeeb3/ps/r3UyVxnTyLWM9zoZ3VYIdYcrQ03OdExYbc8ou1HCUVKfCXw\n/JR5I09cElGF6DvqMmqQte7n5vJ6jskc47j+B8PblwKBgQDpCW81Z3otsPjsXin6\nxnoPk9/C+DPECoKNyOI7zOgHkGJ7u0g5gt/NmYGJNniYfYukP2HTvojhelWKN2IF\nrVBm9xPbdfXqqBMGNylUM1Zd79rsiu/f0RizJWNid6AyGY+lcfkt2+Ay5z9mwnUS\n0q+otuE5lYp0+0z5c7fIi5CAawKBgQDQQLQDRjzpk7uDgYQ5a1v3xSMgWB+hZ+T+\nIOZMwrlwgds5glOlc0+yoWqjypi5DHOQzUKhTXI06gA4aivZCaMJk20XLW58YUZv\nm8429ViQtj/7vjNeJYZB78W3k6qOefplY4HgnTYGsWHQxWUa27uKfIRJlPDdXKer\n/b2GuXQ/PwKBgQDjqubt+sE/wGUAr+I9cQixDVwPo+MXBNmVYYu8tqx9L0836Llg\nDn9N40nNXt0kxYrWlWGit8QM3TKSzRbDyxYA8iSBRNZTQY8MhHmpHFqlfX6ZmAdP\n131VEBLvkUV9jMFs9lNlvSllMc0cPKCaGiGpJ7oUQwe40AbcsnP7xnYPLwKBgHdj\nEI/r/VGe2tn6LxZH4PJ7Nrb9Liz3BcVWkRCidXL1Tvt6Jn/sSl1Kwnrh04oKhFoY\nAkG8x2NkXvn4i+ih6LC9rsWhyvxNO/cR6DeDkeFsSeQFVyd69avpTH0Aj7+cWBs1\n36goGGff2wa3k03BeJNc7O3OEAOncYxdLAEHYog7AoGABM+DjY3w+RvYfuDxcfzj\nj7SynCOfELIeXE2gj3wxTyExc4Ryc5gkjaIxf+dnPyzO2cnNXGPZSXEZbGkEnzdn\n0fsjqLcVx29IMakWP5563WIWeSFrC+CG/bu6ca17G3/KrnxJz/IGPfld0WnPW4x+\nzBHhpSbW5yoUWVLFMAdNBho=\n-----END PRIVATE KEY-----\n".replace(/\\n/g, '\n'),
};

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

const db = admin.firestore();

async function cleanup() {
    console.log("Starting cleanup...");
    const snap = await db.collection('video_lessons').get();
    const seen = new Set();
    let deletedCount = 0;

    for (const doc of snap.docs) {
        const data = doc.data();
        if (seen.has(data.youtubeId)) {
            console.log('Deleting duplicate:', doc.id, 'for video:', data.youtubeId);
            await doc.ref.delete();
            deletedCount++;
        } else {
            seen.add(data.youtubeId);
            console.log('Keeping unique:', doc.id, 'for video:', data.youtubeId);
        }
    }
    console.log(`Cleanup finished. Deleted ${deletedCount} duplicates.`);
}

cleanup().catch(console.error);
