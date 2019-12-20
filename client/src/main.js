import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const firebaseConfig = {
  apiKey: "AIzaSyDkvggyr7N49FowlXttHeX53NElMugUqGo",
  authDomain: "porto-kanban.firebaseapp.com",
  databaseURL: "https://porto-kanban.firebaseio.com",
  projectId: "porto-kanban",
  storageBucket: "porto-kanban.appspot.com",
  messagingSenderId: "1028511898154",
  appId: "1:1028511898154:web:84c18f7020374982218153"
}
firebase.initializeApp(firebaseConfig)

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
