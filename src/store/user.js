import Cookies from 'js-cookie';
//XXX TODO LO DE USER POR ALGUN MOTIVO SE SETEA EN EL INDEX
export default {
  namespaced: true,
  state: {
    user: {
      id: '',
      username: '',
      token: '',
      saveLogin: false,
      avatar: ''
    },
  },
  mutations: {
    user: (state, user) => (state.user = user),

    clear: (state) => {
      state.user = {
        id: '',
        username: '',
        token: '',
        saveLogin: false,
        avatar: ''
      };
    },

    token: (state, token) => (state.user.token = token),
  },
  getters: {
    user: (state) => state.user,
    userToken: (state) => state.user.token,
  },
  actions: {
    async setUserState({ commit }) {
      const user =
        await JSON.parse(sessionStorage.getItem('user')) || await Cookies.getJSON('user');

      commit('user', user);
    },

    async setUserSession({ dispatch }, { user }) {
      if (user?.saveLogin) {
        await Cookies.set(
          'user',
          JSON.stringify({
            id: user.id,
            username: user.username,
            token: user.token,
            saveLogin: user.saveLogin,
            avatar: user.avatar || ''
          }),
          { expires: 7, sameSite: 'none', secure: true }
        );
      } else {
        await sessionStorage.setItem(
          'user',
          JSON.stringify({
            id: user.id,
            username: user.username,
            token: user.token,
            saveLogin: user.saveLogin,
            avatar: user.avatar || ''
          })
        );
      }

      dispatch('setUserState');
    },

    userExists({ getters, dispatch }) {
      dispatch('setUserState');
      return !!getters.user?.id;
    },

    removeUser({ commit }) {
      commit('clear');

      Cookies.remove('user');
      sessionStorage.removeItem('user');
    },
  },
};
