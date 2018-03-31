console.log("It works man!!");
var express = require('express');
var cheerio = require('cheerio');
var fs = require('fs');
var request = require('request');
var app = express();
var clear = require('clear');
var adapter = require('./adapter');
clear();

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