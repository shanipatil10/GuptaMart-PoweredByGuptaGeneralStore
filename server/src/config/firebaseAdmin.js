const { initializeApp, cert, getApps, getApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");

const serviceAccount = require("./firebase-service-account.json");

const app = getApps().length
    ? getApp()
    : initializeApp({
        credential: cert(serviceAccount)
    });

const auth = getAuth(app);

console.log("✅ Firebase Admin initialized");

module.exports = {
    app,
    auth
};