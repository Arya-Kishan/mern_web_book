import admin from "./firebaseAdminConfig.js";

const SendPushnotification = async (deviceToken, title, body) => {

    const message = {
        notification: {
            title, body
        },
        token: deviceToken
    };

    try {
        const response = await admin.messaging().send(message);
        console.log("NOTIFICATION SEND");
        return response;
    } catch (error) {
        console.log(error);
        throw new Error("message not send notification");
    }

}

export default SendPushnotification;