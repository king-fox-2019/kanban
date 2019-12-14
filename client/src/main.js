import Vue from 'vue'
import App from './App.vue'
import './assets/firebase.config.js'

Vue.config.productionTip = false
Vue.prototype.$db = firebase.firestore()

new Vue({
  render: h => h(App)
}).$mount('#app')
