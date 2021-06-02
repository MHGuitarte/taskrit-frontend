import Vue from 'vue'
import Vuex from 'vuex'

import access from './access'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  getters: {
  },
  actions: {
  },
  modules: {
    access: access,
    user: user
  }
})
