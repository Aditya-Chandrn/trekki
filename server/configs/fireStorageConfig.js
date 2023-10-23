import admin from "firebase-admin";
import serviceAccount from "../keys/serviceAccountKey.json" assert {type: "json"};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://trekki-9484e.appspot.com"
});

const storageBucket = admin.storage().bucket();

export {storageBucket};