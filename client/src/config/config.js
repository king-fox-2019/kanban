import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: 'AIzaSyCtS7CkkbGAlsJvbUaP-s4m9Mu4amxr84s',
  authDomain: 'kanban-92985.firebaseapp.com',
  databaseURL: 'https://kanban-92985.firebaseio.com',
  projectId: 'kanban-92985',
  storageBucket: 'kanban-92985.appspot.com',
  messagingSenderId: '615477345633',
  appId: '1:615477345633:web:e544ca3a7aa053361e5920'
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export default db

// const firebaseConfig = {
//   apiKey: process.env.VUE_APP_API_KEY,
//   authDomain: process.env.VUE_APP_AUTH_DOMAIN,
//   databaseURL: process.env.VUE_APP_DATABASE_URL,
//   projectId: process.env.VUE_APP_PROJECT_ID,
//   storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
//   appId: process.env.VUE_APP_APP_ID
// }
