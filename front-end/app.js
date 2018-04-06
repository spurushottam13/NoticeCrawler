console.log("app.js works!!");
var config = {
    apiKey: "AIzaSyDaCOodGqpNrMCan-nXlnxREljpOTndRVk",
    authDomain: "noticecrawler.firebaseapp.com",
    databaseURL: "https://noticecrawler.firebaseio.com",
    projectId: "noticecrawler",
    storageBucket: "noticecrawler.appspot.com",
    messagingSenderId: "457659866476"
  };
  firebase.initializeApp(config);

function run(){
    console.log('button clicked');
}

const messaging = firebase.messaging();
const dbRef = firebase.database().ref('/fcmToken');

messaging.requestPermission()
.then(function(){
    console.log("Got permission");
    return messaging.getToken();
    
})
.then(function(token){
    console.log(token);
})
.catch(function(err){
    console.log("Error",err);
})