// import admin from "firebase-admin";
// import serviceAccount from "./firebaseServiceAccount.json";

// if (!admin.apps.length) {
//   admin.initializeApp({
//     // credential: admin.credential.cert({
//     //   projectId: process.env.FIREBASE_PROJECT_ID,
//     //   clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//     //   privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//     // }),
//      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
//   });
// }

// export default admin;

import admin from "firebase-admin";
import path from "path";
import fs from "fs";

const serviceAccountPath = path.join(
  __dirname,
  "firebaseServiceAccount.json"
);

if (!fs.existsSync(serviceAccountPath)) {
  throw new Error("🔥 firebaseServiceAccount.json not found");
}

admin.initializeApp({
  credential: admin.credential.cert(
    require(serviceAccountPath)
  ),
});

export default admin;
