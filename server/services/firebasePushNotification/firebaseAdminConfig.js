import admin from "firebase-admin"


var serviceAccount = "arya"


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://app-1dcec-default-rtdb.firebaseio.com"
});

export default admin;