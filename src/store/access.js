import UserService from '@/service/UserService';

export default {
  namespaced: true,
  state: {
    isLogin: false,
    accessError: false,
    accessErrorMsg: '',
    user: {
      id: '',
      username: '',
    },
    showAccessModal: false,
    accessModalInfo: {
      type: 'info',
      message: '',
      confirm: 'Aceptar',
    },
  },
  mutations: {
    isLogin: (state, isLogin) => (state.isLogin = isLogin),
    accessError: (state, accessError) => (state.accessError = accessError),
    accessErrorMsg: (state, accessErrorMsg) =>
      (state.accessErrorMsg = accessErrorMsg),
    user: (state, user) => (state.user = user),
    showAccessModal: (state, showAccessModal) =>
      (state.showAccessModal = showAccessModal),
    accessModalInfo: (state, accessModalInfo) =>
      (state.accessModalInfo = accessModalInfo),
  },
  getters: {
    isLogin: (state) => state.isLogin,
    accessError: (state) => state.accessError,
    accessErrorMsg: (state) => state.accessErrorMsg,
    getUser: (state) => state.user,
    showAccessModal: (state) => state.showAccessModal,
    accessModalInfo: (state) => state.accessModalInfo,
  },
  actions: {
    changeLoginPage({ state, commit }) {
      commit('isLogin', !state.isLogin);
    },

    setAccessError({ state, commit }) {
      commit('accessError', !state.accessError);
    },

    setAccessErrorMsg({ commit }, message) {
      commit('accessErrorMsg', message);
    },

    async registerUser({ dispatch }, user) {
      try {
        const userId = await UserService.register(user);

        if (userId) {
          dispatch('changeLoginPage', null, { root: true });
          dispatch('toggleAccessModal', {
            type: 'success',
            message:
              'Usuario registrado correctamente. Ahora puedes acceder al sistema.',
          });
        } else {
          dispatch('setAccessError');

          dispatch(
            'setAccessErrorMsg',
            'Error durante el registro de usuario. Inténtelo más tarde'
          );
        }
      } catch (error) {
        dispatch('setAccessError');
        dispatch(
          'setAccessErrorMsg',
          'Error durante el registro de usuario. Inténtelo más tarde'
        );

        return error;
      }
    },

    async loginUser({ commit, dispatch }, { user, password, save = false }) {
      const { id, username, token, saveLogin } = UserService.login({
        user,
        password,
        save,
      });

      if (token) {
        commit('user', { id, username });
        this.$cookies.set('token', token, saveLogin ? '1w' : '2d');

        this.$router.push({ name: 'boards', params: { user: username } });
      } else {
        dispatch('setAccessError');
        dispatch('setAccessErrorMsg', 'Usuario o contraseña incorrectos');
      }
    },

    toggleAccessModal({ state, commit }) {
      commit('showAccessModal', !state.showAccessModal);
    },

    setAccessModalInfo(
      { commit },
      { type = 'info', message, confirm = 'Aceptar' }
    ) {
      commit('accessModalInfo', {
        type,
        message,
        confirm,
      });
    },
  },
};
