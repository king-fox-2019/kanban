var firebase = require('firebase/app')

require('firebase/auth')
require('firebase/firestore')

var firebaseConfig = {
  authDomain: 'kanban-7d393.firebaseapp.com',
  databaseURL: 'https://kanban-7d393.firebaseio.com',
  projectId: 'kanban-7d393',
  storageBucket: 'kanban-7d393.appspot.com',
  messagingSenderId: '508642156809',
  appId: '1:508642156809:web:04cb8fbb1c0165aceb73d8',
  measurementId: 'G-VKCB2L3FB3'
}

firebase.initializeApp(firebaseConfig)

module.exports = firebase
