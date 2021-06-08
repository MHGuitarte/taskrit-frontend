import Vue from 'vue'
import App from './App.vue'
// Bootstrap 5
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

// Vue Router and Vuex
import router from './router'
import store from './store'


// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// FontAwesome Icons
import { faUser, faPlus, faHome, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faUser, faPlus, faHome, faCog, faSignOutAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)

import User from '@/utils/User';

Vue.prototype.$user = User;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
