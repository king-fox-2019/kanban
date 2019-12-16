import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDL0ztZUQoC4yP1D9i7IGBPw0e8M2IrcKQ',
  authDomain: 'kanban-ae591.firebaseapp.com',
  databaseURL: 'https://kanban-ae591.firebaseio.com',
  projectId: 'kanban-ae591',
  storageBucket: 'kanban-ae591.appspot.com',
  messagingSenderId: '178531644105',
  appId: '1:178531644105:web:40355227d360f4a9035318',
  measurementId: 'G-6LNS54RM97'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

export default db
