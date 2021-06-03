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
          dispatch('');
        } else {
          dispatch('accessError', null, { root: true });
          dispatch(
            'accessErrorMsg',
            'Error durante el registro de usuario. Inténtelo más tarde',
            { root: true }
          );
        }
      } catch (error) {
        dispatch('accessError', null, { root: true });
        dispatch(
          'accessErrorMsg',
          'Error durante el registro de usuario. Inténtelo más tarde',
          { root: true }
        );
        return error;
      }
    },

    async loginUser({ commit }, { user, password, save = false }) {
      const { id, username, token, saveLogin } = UserService.login({
        user,
        password,
        save,
      });

      commit('user', { id, username });
      this.$cookies.set('token', token, saveLogin ? '1w' : '2d');

      //TODO: como manejar errores
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
