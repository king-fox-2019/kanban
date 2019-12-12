const firebase = require('firebase/app');

require('firebase/auth');
require('firebase/firestore');

const firebaseConfig = {
  apiKey: 'AIzaSyCFDnWg_L0xonPPL2ZdMAXaOPZbq1NGYVk',
  authDomain: 'kanban-1e1e9.firebaseapp.com',
  databaseURL: 'https://kanban-1e1e9.firebaseio.com',
  projectId: 'kanban-1e1e9',
  storageBucket: 'kanban-1e1e9.appspot.com',
  messagingSenderId: '402149971590',
  appId: '1:402149971590:web:1d8dacfe7479dd8527a307',
  measurementId: 'G-581J87BKF9',
};

firebase.initializeApp(firebaseConfig);

module.exports = firebase;
