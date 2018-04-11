console.log("Send Script");
var admin = require('firebase-admin');
var send = function(notice, registrationToken) {
    //Preparing Message
    var message = {
        notification: {
            title: 'PUSSGRC Notice',
            body: notice.msg,
            icon: "https://lh4.googleusercontent.com/proxy/ZUDHNDgpNIiczYU5YaTFXz72Trz683HPfRrwRiogbrsgxegLz20XOYl7vKZ5tlOdVc_wbs7Mr_1CwHgSyaeRwrFm_A1_enqS2MDffFnzsYC3We4PQdoOb6_amX-fLjPv-W7veUTVSE31IU5pkSwjWm_yqIl6LA=w160-h160-k-no",
            click_action: notice.link,
        },
    };
    //Send Notification Command
    admin.messaging().sendToDevice(registrationToken, message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Dry run successful:', response);
            return;
        })
        .catch((error) => {
            console.log('Error during dry run:', error);
        });

}
module.exports = send;