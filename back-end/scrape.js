var cheerio = require('cheerio');
var request = require('request');
var adapter = require('./adapter');
var https = require('https');
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
            var msgLink = [];
            $('tr').filter(function() {
                var data = $(this);
                msgId.push(data.children().first().text());
                msgDate.push(data.children().first().next().text());
                msg.push(data.children().last().text());
                var link = "http://ssgpurch.puchd.ac.in/" + data.children().children().last().attr('href')
                msgLink.push(link);
            })
            adapter(msgId, msgDate, msg, msgLink);
        }
    })
    setInterval(function() {
        https.get('https://noticecrawler13.herokuapp.com/')
    }, 300000);
}
module.exports = scrape;