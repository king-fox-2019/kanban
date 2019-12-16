import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import firebase from 'firebase'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: 'AIzaSyDez0nmF0oL9xvYrRZDnMCjRF5y89pbmyg',
  authDomain: 'miniwp-261307.firebaseapp.com',
  databaseURL: 'https://miniwp-261307.firebaseio.com',
  projectId: 'miniwp-261307',
  storageBucket: 'miniwp-261307.appspot.com',
  messagingSenderId: '669801235606',
  appId: '1:669801235606:web:f1c9b07b42c1c48ceeeeb7'
})

new Vue({
  render: h => h(App)
}).$mount('#app')
