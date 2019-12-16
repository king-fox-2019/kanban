import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBRadm7Sk1ICtcMTV6-ez5AltKXwhzFc7A',
  authDomain: 'kanban-sukmabrahmantya.firebaseapp.com',
  databaseURL: 'https://kanban-sukmabrahmantya.firebaseio.com',
  projectId: 'kanban-sukmabrahmantya',
  storageBucket: 'kanban-sukmabrahmantya.appspot.com',
  messagingSenderId: '283136010651',
  appId: '1:283136010651:web:5c190e132e8c4fccf5593e',
  measurementId: 'G-P1XVBLCNV3',
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;
