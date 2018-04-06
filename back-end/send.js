console.log("Send Script");
var admin = require('firebase-admin');
var send = function() {
    // Preparing registrationToken array
    var registrationToken = [];
    var fcm = admin.database().ref('/fcmToken');
    fcm.on('value', (snapshot) => {
        var registrationToken = Object.keys(snapshot.val()).map(function(key) {
            return snapshot.val()[key];
        });
        //Preparing Message
        var message = {
            notification: {
                title: 'PUSSGRC Notice',
                body: 'Put your dick in your pant and move your fucking ass from thier'
            },
        };
        //Send Notification Command
        admin.messaging().sendToDevice(registrationToken, message)
            .then((response) => {
                // Response is a message ID string.
                console.log('Dry run successful:', response);
            })
            .catch((error) => {
                console.log('Error during dry run:', error);
            });
    });

}
module.exports = send;