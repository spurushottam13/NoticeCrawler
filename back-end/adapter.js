// ****     Adapter => Its takes data and creates object also responsible for updation... 
var admin = require('firebase-admin');
var updateDB = require('./updateDB');
var fs = require('fs')
var json = {}
var adapter = function(id, date, msg) {
    var len = id.length;
    for (i = 0; i < len; i++) {
        var tdate = date[i];
        var tmsg = msg[i];
        var temp = {
            'date': tdate,
            'msg': tmsg,
        }
        json[i] = temp;

    }
    fs.writeFile('msgStack', JSON.stringify(json, null, 4), function(err) {
        var serverValue = Object.keys(json).length;
        admin.database().ref('/NoticeStack/Notice').on('value', (snapshot) => {
            if (snapshot.numChildren() == serverValue) {
                console.log("No need to run the Update DB");
            } else {
                console.log("*****", snapshot.numChildren(), serverValue)
                updateDB(json)
            }
        });
    })
}


module.exports = adapter;