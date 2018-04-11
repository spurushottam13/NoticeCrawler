var express = require('express');
var fs = require('fs');
var admin = require('firebase-admin');
var clear = require('clear');
var app = express();
var serviceAccount = require('./noticecrawler-firebase-adminsdk-31rbr-faf8064515.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://noticecrawler.firebaseio.com",
    projectId: "noticecrawler",
    storageBucket: "noticecrawler.appspot.com",
    messagingSenderId: "457659866476",

});
var scrape = require('./scrape');
var port = process.env.PORT || 3000;
clear();
setInterval(scrape, 15000);
app.get('/', function(req, res) {
    res.send("Your app is working fine");
})
app.listen(port)
console.log('Magic happening . . . ');
exports = module.exports = app;