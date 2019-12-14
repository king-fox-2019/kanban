var firebase = require('firebase/app')

require('firebase/auth')
require('firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyA_QzqKV5j-UYcDLZdWFfZTlBt5Kgt7fCE",
    authDomain: "kanban-8ab24.firebaseapp.com",
    databaseURL: "https://kanban-8ab24.firebaseio.com",
    projectId: "kanban-8ab24",
    storageBucket: "kanban-8ab24.appspot.com",
    messagingSenderId: "831160174904",
    appId: "1:831160174904:web:556220fb556c70513719cd",
    measurementId: "G-X0KF587839"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

let db = firebase.firestore()

export {
    db
}