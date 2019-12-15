const firebase = require('firebase/app')
require('firebase/firestore')
// require('dotenv').config()

const firebaseConfig = {
    apiKey: "AIzaSyAqby0nuYy6n95nZYT1inJ4D3l6HduavPU",
    authDomain: "kanban-91c05.firebaseapp.com",
    projectId:"kanban-91c05"
    
}

console.log('TCL \n============\n ', 'nanti cari tau kenapa envnya gkjalan')
console.log('TCL \n============\n apikey ', firebaseConfig.apiKey)
console.log('TCL \n============\n authdomain', firebaseConfig.authDomain)
console.log("TCL: process.env.FIREBASE_PROJECT_ID", process.env.FIREBASE_PROJECT_ID)


firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
module.exports = db

