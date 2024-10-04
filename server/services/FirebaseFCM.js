import admin from "firebase-admin"

var serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK)

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://app-1dcec-default-rtdb.firebaseio.com"
});


const sendNotificationFCM = async (deviceToken, title, body) => {

    const message = {
        notification: {
            title, body
        },
        token: deviceToken
    };

    try {
        const response = await admin.messaging().send(message);
        return response;
    } catch (error) {
        console.log(error);
        throw new Error("message not send notification");
    }

}

export default sendNotificationFCM;
