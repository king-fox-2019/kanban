import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import VueDraggable from 'vue-draggable'
import VueFeatherIcon from 'vue-feather-icon'

Vue.use(VueDraggable)
Vue.use(VueFeatherIcon)
Vue.use(Buefy)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
