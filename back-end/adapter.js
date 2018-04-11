// ****     Adapter => Its takes data and creates object also responsible for updation... 
var admin = require('firebase-admin');
var updateDB = require('./updateDB');
var scrape = require('./scrape');
var restart = require('./restart');
var fs = require('fs')
var json = {}
var yes = admin.database().ref('/yes');
var no = admin.database().ref('/no');
var adapter = function(id, date, msg, link) {
    var len = id.length;
    for (i = 0; i < len; i++) {
        var tdate = date[i];
        var tmsg = msg[i];
        var tlink = link[i];
        var temp = {
            'date': tdate,
            'msg': tmsg,
            'link': tlink
        }
        json[i] = temp;
    }
    fs.writeFile('msgStack', JSON.stringify(json, null, 4), function(err) {
        var serverValue = Object.keys(json).length;
        notice = json[0];
        admin.database().ref('/NoticeStack/Notice').once('value').then((snapshot) => {
            if (snapshot.numChildren() == serverValue) {
                console.log("No New Notice");
                console.log((new Date()).toJSON().slice(0, 19).replace(/[-T]/g, ':'));
                no.set({ Last: (new Date()).toJSON().slice(0, 19).replace(/[-T]/g, ':') });
            } else {
                console.log("Got New Notice");
                console.log((new Date()).toJSON().slice(0, 19).replace(/[-T]/g, ':'));
                console.log("##", snapshot.numChildren(), serverValue)
                yes.set({ Lastest: (new Date()).toJSON().slice(0, 19).replace(/[-T]/g, ':') });
                updateDB(json, notice)
            }
        });
    })
}


module.exports = adapter;
/*
test masg 
 
   var d = {
       'date': 'tdate',
       'msg': 'tmsg',
       'link': 'tlink'
   }
   json['s'] = d;
   */