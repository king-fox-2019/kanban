import Vue from 'vue'
import firebase from 'firebase'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import { firebaseConfig } from './config/firebase.config.js'


firebase.initializeApp(firebaseConfig)

Vue.use(BootstrapVue)
Vue.config.productionTip = false
Vue.prototype.$firestore = firebase.firestore()


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
