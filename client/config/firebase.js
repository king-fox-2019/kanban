import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: process.env.VUE_APP_apiKey,
  authDomain: process.env.VUE_APP_authDomain,
  databaseURL: "https://kanban-h8p2w3.firebaseio.com",
  projectId: process.env.VUE_APP_projectId,
  storageBucket: "kanban-h8p2w3.appspot.com",
  messagingSenderId: "732581837050",
  appId: "1:732581837050:web:12412440e202e97fb6f143"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

export default db;