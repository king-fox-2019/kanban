import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBAwbZC-7rMcut67Vh0smgFIlixGJfosKE',
  authDomain: 'kanban-vn.firebaseapp.com',
  databaseURL: 'https://kanban-vn.firebaseio.com',
  projectId: 'kanban-vn',
  storageBucket: 'kanban-vn.appspot.com',
  messagingSenderId: '678151542756',
  appId: '1:678151542756:web:a49fa8dc14e331d5eb59f1',
  measurementId: 'G-CF9K8VWRVB'
}

firebase.initializeApp(firebaseConfig)

export default firebase
