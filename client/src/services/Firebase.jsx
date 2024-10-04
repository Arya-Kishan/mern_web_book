import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken } from "firebase/messaging";
import { toast } from 'react-toastify'
import { handleError } from "../helper/CreateError";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "app-1dcec.firebaseapp.com",
    databaseURL: "https://app-1dcec-default-rtdb.firebaseio.com",
    projectId: "app-1dcec",
    storageBucket: "app-1dcec.appspot.com",
    messagingSenderId: "828078763203",
    appId: "1:828078763203:web:cfa44a003d35ed251c4676"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const messaging = getMessaging(app);

export const permissionAndTokenGeneration = async () => {
    const permission = await Notification.requestPermission();
    if (permission == "granted") {
        try {
            const deviceToken = await getToken(messaging,
                {
                    vapidKey: "BP0Mbxjb9y4y1s-IsO3ictugtjjLoMkh6II_tW4Rt6bCBnPi-OpCicpljfpcMt6ZwlqLsajzEto6KoODHumqSDo"
                }
            );
            return { deviceToken: deviceToken, permission: "accepted" }
        } catch (error) {
            console.log("DEVICE TOKEN NOT GENERATED FIREBASE : ERROR OCCURED");
            console.log(error);
            handleError(`${error?.name ?? "Error Occured"}:${error?.message ?? "FCM token not created"}`, 'Error in Firebase FCM generation', `Firebase : ${error?.stack ?? "Error in Firebase Component"}`)
            return { deviceToken: null, permission: "rejected" }
        }

    } else {
        toast("Notifications Denied 😢");
        return { deviceToken: null, permission: "rejected" }
    }

}
