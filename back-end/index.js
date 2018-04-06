var express = require('express');
var cheerio = require('cheerio');
var fs = require('fs');
var request = require('request');
var admin = require('firebase-admin');
var serviceAccount = require('./noticecrawler-firebase-adminsdk-31rbr-faf8064515.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://noticecrawler.firebaseio.com",
    projectId: "noticecrawler",
    storageBucket: "noticecrawler.appspot.com",
    messagingSenderId: "457659866476",

});
var clear = require('clear');
var adapter = require('./adapter');
var app = express();

clear();
// Crawle Website and send data to adapter
var scrape = function() {
    url = "http://ssgpurch.puchd.ac.in/show-noticeboard.php";
    request(url, function(error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            var id, date, msg
            var msgId = [];
            var msgDate = [];
            var msg = [];
            $('tr').filter(function() {
                var data = $(this);
                msgId.push(data.children().first().text());
                msgDate.push(data.children().first().next().text());
                msg.push(data.children().last().text())
            })
            adapter(msgId, msgDate, msg);
        }
    })
}
scrape();

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;