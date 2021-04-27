import * as admin from "firebase-admin";

import serviceAccount from "../../idsp2-667df-firebase-adminsdk-lq46s-e610ba03d2.json";

const account = serviceAccount as admin.ServiceAccount;

admin.initializeApp({
    credential: admin.credential.cert(account),
    databaseURL: process.env.DATABASE_URL
});



export default admin.firestore();