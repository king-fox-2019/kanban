import firebase from 'firebase/app'
import 'firebase/firestore'

let firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: 'https://kanban-52877.firebaseio.com',
  projectId: process.env.VUE_APP_PROJECTID,
  storageBucket: 'kanban-52877.appspot.com',
  messagingSenderId: '42722280399',
  appId: '1:42722280399:web:4783bc48fa853c3c5088ba'
}
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
export default db
