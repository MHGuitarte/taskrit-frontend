import Vue from 'vue';
import Vuex from 'vuex';

import access from './access';
import boards from './boards';
import user from './user';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    access: access,
    boards: boards,
    user: user,
  },
});
