import firebase from "firebase/app";
import "firebase/firestore";

let firebaseConfig = {
  apiKey: process.env.VUE_APP_apiKey,
  authDomain: process.env.VUE_APP_authDomain,
  databaseURL: "https://kanban-b5e79.firebaseio.com",
  projectId: process.env.VUE_APP_projectId,
  storageBucket: "kanban-b5e79.appspot.com",
  messagingSenderId: "1019485037944",
  appId: "1:1019485037944:web:30749fc58810c29861948d"
};

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

export default db;
