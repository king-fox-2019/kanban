import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store.js'
import Buefy from 'buefy'
import 'sweetalert2/src/sweetalert2.scss'

Vue.config.productionTip = false
Vue.use(Buefy)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
