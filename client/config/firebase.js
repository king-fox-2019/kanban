// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyC7iJNppRCSIyM5ILbLcFyWbDbTrGvPSEQ",
  authDomain: "syx-kanban.firebaseapp.com",
  databaseURL: "https://syx-kanban.firebaseio.com",
  projectId: "syx-kanban",
  storageBucket: "syx-kanban.appspot.com",
  messagingSenderId: "214076738089",
  appId: "1:214076738089:web:376481f6e5706db3e26a38",
  measurementId: "G-XD9N21E9S9"
};

firebase.initializeApp(firebaseConfig);

module.exports = firebase;
