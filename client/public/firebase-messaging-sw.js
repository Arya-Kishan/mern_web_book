importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyBDcHgECJC9Ph9ZI9yH2iFiGfoXa3Ki9Lo",
    authDomain: "app-1dcec.firebaseapp.com",
    databaseURL: "https://app-1dcec-default-rtdb.firebaseio.com",
    projectId: "app-1dcec",
    storageBucket: "app-1dcec.appspot.com",
    messagingSenderId: "828078763203",
    appId: "1:828078763203:web:cfa44a003d35ed251c4676"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
        '[firebase-messaging-sw.js] Received background message ',
        payload
    );
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});