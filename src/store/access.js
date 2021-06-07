import UserService from '@/service/UserService';
import Cookies from 'js-cookie';

export default {
  namespaced: true,
  state: {
    isLogin: true,
    accessMsg: {
      type: 'danger',
      message: '',
    },
    user: {
      id: '',
      username: '',
    },
  },
  mutations: {
    isLogin: (state, isLogin) => (state.isLogin = isLogin),
    accessMsg: (state, accessMsg) => (state.accessMsg = accessMsg),
    user: (state, user) => (state.user = user),
  },
  getters: {
    isLogin: (state) => state.isLogin,
    accessMsg: (state) => state.accessMsg,
    getUser: (state) => state.user,
  },
  actions: {
    setUser({ commit }, { id, username }) {
      commit('user', { id, username });
    },

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

    async loginUser({ commit, dispatch }, { username, password, save = false }) {

      const loggedUser = await UserService.login({
        username,
        password,
        save,
      });

      if (loggedUser.token) {
        commit('user', { id: loggedUser.id, username: loggedUser.username });
        let a = true
        if (a) {
          Cookies.set('user', JSON.stringify({ id: loggedUser.id, username: loggedUser.username, token: loggedUser.token }), { expires: 7, sameSite: 'none', secure: true });
        } else {
          sessionStorage.setItem('user', JSON.stringify({ id: loggedUser.id, username: loggedUser.username, token: loggedUser.token }));
        }

        return true;
      } else {
        dispatch('setAccessMsg', {
          type: 'danger',
          message:
            'Usuario o contraseña incorrectos',
        });

        return false;
      }
    },
  },
};
