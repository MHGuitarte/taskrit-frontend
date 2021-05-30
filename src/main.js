import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import VueResource from 'vue-resource'

Vue.config.productionTip = false

Vue.use(VueCookies)
Vue.use(VueResource)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
