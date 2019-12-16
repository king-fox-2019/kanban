const firebase = require('firebase/app')
require('firebase/firestore')
require('firebase/auth')

console.log(process.env.VUE_APP_API_KEY);

firebase.initializeApp({
  // apiKey: 'AIzaSyDNBFoW3KXAdYT3wNmgGduLmyEw-r9kUbk',
  // authDomain: 'friendskanban.firebaseapp.com',
  // projectId: 'friendskanban'
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID
})

// var db = firebase.firestore()
module.exports = firebase
