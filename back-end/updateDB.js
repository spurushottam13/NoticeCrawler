var send = require('./send.js');
var admin = require('firebase-admin');
var updateDB = function(json) {
    console.log("Updating DB . . . ")
    admin.database().ref('/NoticeStack').set({
        Notice: json
    });
    send()
}
module.exports = updateDB;