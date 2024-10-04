import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken } from "firebase/messaging";

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

export const generateToken = async () => {
    const permission = await Notification.requestPermission();
    console.log(permission);

    if (permission == "granted") {

        try {
            const deviceToken = await getToken(messaging,
                {
                    vapidKey: "BP0Mbxjb9y4y1s-IsO3ictugtjjLoMkh6II_tW4Rt6bCBnPi-OpCicpljfpcMt6ZwlqLsajzEto6KoODHumqSDo"
                }
            );
            console.log(deviceToken);
        } catch (error) {
            console.log("DEVICE TOKEN NOT GENERATED FIREBASE");
            console.log(error);
        }

    } else {
        toast("Notifications Denied");
    }

}
