import firebase from "firebase/app";
import "firebase/firestore";

let firebaseConfig = {
  apiKey: process.env.VUE_APP_apiKey,
  authDomain: process.env.VUE_APP_authDomain,
  databaseURL: "https://kanban-1.firebaseio.com",
  projectId: process.env.VUE_APP_projectId,
  storageBucket: "kanban-1.appspot.com",
  messagingSenderId: "509467594561",
  appId: "1:509467594561:web:f8e8f04cadd974be17dbc0",
  measurementId: "G-EXR6975M1D"
};

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

export default db;
