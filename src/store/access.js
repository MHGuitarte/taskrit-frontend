import UserService from '@/service/UserService';

export default {
  namespaced: true,
  state: {
    isLogin: false,
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

    loginUser({ commit, dispatch }, { username, password, save = false }) {
      
      const loggedUser = UserService.login({
        username,
        password,
        save,
      });

      console.log('devuelta', loggedUser);

      if (loggedUser.token) {
        commit('user', { id: loggedUser.id, username: loggedUser.username });
        if (loggedUser.saveLogin) {
          this.$cookies.set('user', { id: loggedUser.id, username: loggedUser.username, token: loggedUser.token }, '1w');
        } else {
          sessionStorage.setItem('token', { id: loggedUser.id, username: loggedUser.username, token: loggedUser.token });
        }

        this.$router.push({ name: 'boards', params: { user: loggedUser.username } });
      } else {
        dispatch('setAccessMsg', 'Usuario o contraseña incorrectos');
      }
    },
  },
};
