importScripts("https://www.gstatic.com/firebasejs/4.12.0/firebase.js");
var config = {
    apiKey: "AIzaSyDaCOodGqpNrMCan-nXlnxREljpOTndRVk",
    authDomain: "noticecrawler.firebaseapp.com",
    databaseURL: "https://noticecrawler.firebaseio.com",
    projectId: "noticecrawler",
    storageBucket: "noticecrawler.appspot.com",
    messagingSenderId: "457659866476"
};
firebase.initializeApp(config);


const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    document.getElementById('recived').innerHTML = "Recived";
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    var notificationTitle = 'Background Message Title';
    var notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);


});