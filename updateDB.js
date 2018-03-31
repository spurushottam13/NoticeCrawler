var firebase = require('firebase');

firebase.initializeApp({
    databaseURL: 'https://noticecrawler.firebaseio.com',
    serviceAccount: 'noticecrawler-firebase-adminsdk-31rbr-640e7bd2ec.json', //this is file that I downloaded from Firebase Console
});

var updateDB = function(json) {
    console.log("json", json)
    firebase.database().ref('/').set({
        Notice: json
    });
}

module.exports = updateDB;