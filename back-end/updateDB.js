var send = require('./send.js');
var admin = require('firebase-admin');
var updateDB = function(json, notice) {
    console.log("Updating DB . . . ")
    admin.database().ref('/NoticeStack').set({
        Notice: json
    });
    // Preparing registrationToken array
    var registrationToken = [];
    var fcm = admin.database().ref('/fcmToken');
    fcm.once('value').then((snapshot) => {
        registrationToken = Object.keys(snapshot.val()).map(function(key) {
            return snapshot.val()[key];
        });
        send(notice, registrationToken)
    });
}
module.exports = updateDB;