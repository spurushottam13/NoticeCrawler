console.log("app.js wodddrkssssssss!!");
var config = {
    apiKey: "AIzaSyDaCOodGqpNrMCan-nXlnxREljpOTndRVk",
    authDomain: "noticecrawler.firebaseapp.com",
    databaseURL: "https://noticecrawler.firebaseio.com",
    projectId: "noticecrawler",
    storageBucket: "noticecrawler.appspot.com",
    messagingSenderId: "457659866476"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();
const dbRef = firebase.database().ref('/fcmToken');

var status = 0

if (localStorage.getItem('token') == null) {
    console.log("Not Set ");
} else {
    document.getElementById("button").onclick = function() { //disable
        this.disabled = true;
        console.log("** Disable ** ");
    }
    document.getElementById('button').innerHTML = "✔ DONE";
    document.getElementById('msg').innerHTML = "You will receive notification as soon as new notice is uploaded on website.";
}

function run() {
    console.log('button clicked');
    messaging.requestPermission()
        .then(function() {
            // == Got permission == 
            console.log("Got permission");
            return messaging.getToken();

        })
        .then(function(token) {
            // == Got Token ==
            console.log(token);
            localStorage.setItem('token', token);
            dbRef.push(token, () => {
                console.log("** Upadate on DB **")
                    // == Disable Change button if updated
                document.getElementById("button").onclick = function() { //disable
                    this.disabled = true;
                    console.log("** Disable ** ");
                }
                document.getElementById('button').innerHTML = "✔ DONE";
                document.getElementById('msg').innerHTML = "You will receive notification as soon as new notice is uploaded on website.";

            });

        })
        .catch(function(err) {
            console.log("Error", err);
        })
}
messaging.onTokenRefresh(function() {
    messaging.requestPermission()
        .then(function() {
            // == Got permission == 
            console.log("Got permission");
            return messaging.getToken();

        })
        .then(function(token) {
            // == Got Token ==
            console.log(token);
            localStorage.setItem('token', token);
            dbRef.push(token, () => {
                console.log("** Upadate on DB **")
                    // == Disable Change button if updated
                document.getElementById("button").onclick = function() { //disable
                    this.disabled = true;
                    console.log("** Disable ** ");
                }
                document.getElementById('button').innerHTML = "✔ DONE";
                document.getElementById('msg').innerHTML = "You will receive notification as soon as new notice is uploaded on website.";

            });

        })
        .catch(function(err) {
            console.log("Error", err);
        })
});

messaging.onMessage(function(payload) {
    console.log("on meaage", payload);
})