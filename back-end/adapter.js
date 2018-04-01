var updateDB = require('./updateDB');
var fs = require('fs')
var json = {}
var adapter = function(id, date, msg) {
    var len = id.length;
    console.log("adapter runs", len);
    for (i = 0; i < len; i++) {
        console.log(i);
        var tdate = date[i];
        var tmsg = msg[i];
        var temp = {
            'date': tdate,
            'msg': tmsg,
        }
        json[i] = temp;

    }
    fs.writeFile('msgStack', JSON.stringify(json, null, 4), function(err) {
        console.log("File Written");
        updateDB(json);
    })
}


module.exports = adapter;