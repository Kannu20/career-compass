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
// import path from "path";
import fs from "fs";

const serviceAccountPath = {
  type: process.env.FB_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FB_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FB_CLIENT_ID,
  auth_uri: process.env.FB_AUTH_URI,
  token_uri: process.env.FB_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FB_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.FB_CLIENT_CERT_URL,

};

// if (!fs.existsSync(serviceAccountPath)) {
//   throw new Error("🔥 firebaseServiceAccount.json not found");
// }

admin.initializeApp({
  credential: admin.credential.cert(
    // require(serviceAccountPath)
    serviceAccountPath as admin.ServiceAccount
  ),
});

export default admin;

