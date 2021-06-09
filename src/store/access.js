import UserService from '@/service/UserService';

export default {
  namespaced: true,
  state: {
    isLogin: true,
    accessMsg: {
      type: 'danger',
      message: '',
    },
  },
  mutations: {
    isLogin: (state, isLogin) => (state.isLogin = isLogin),
    accessMsg: (state, accessMsg) => (state.accessMsg = accessMsg),
  },
  getters: {
    isLogin: (state) => state.isLogin,
    accessMsg: (state) => state.accessMsg,
  },
  actions: {
    changeLoginPage({ state, commit }) {
      commit('isLogin', !state.isLogin);
    },

    setAccessMsg({ commit }, { type, message }) {
      commit('accessMsg', { type, message });
    },

    async registerUser({ dispatch }, user) {
      try {
        const userId = await UserService.register(user);

        if (userId) {
          dispatch('changeLoginPage');
          dispatch('setAccessMsg', {
            type: 'success',
            message:
              'Usuario creado correctamente. Ahora puede empezar a usar TaskrIt.',
          });
        } else {
          dispatch('setAccessMsg', {
            type: 'danger',
            message:
              'Se produjo un error durante el registro. Por favor, inténtelo más tarde.',
          });
        }
      } catch (error) {
        console.error('Error registering user : ', error);
        dispatch('setAccessMsg', {
          type: 'danger',
          message:
            'Se produjo un error durante el registro. Por favor, inténtelo más tarde.',
        });
      }
    },

    async loginUser({ dispatch }, { username, password, save = false }) {
      const loggedUser = await UserService.login({
        username,
        password,
        save,
      });

      if (loggedUser.token) {
        await dispatch('user/setUserSession', { user: loggedUser }, { root: true });

        return true;
      } else {
        dispatch('setAccessMsg', {
          type: 'danger',
          message: 'Usuario o contraseña incorrectos',
        });

        return false;
      }
    },

    async logout({ dispatch }) {
      dispatch('user/removeUser', null, { root: true });
    },
  },
};
