export default {
    namespaced: true,
    state: {
        isLogin: false,
        accessError: false,
        accessErrorMsg: ''
    },
    mutations: {
        isLogin: (state, isLogin) => state.isLogin = isLogin,
        accessError: (state, accessError) => state.accessError = accessError,
        accessErrorMsg: (state, accessErrorMsg) => state.accessErrorMsg = accessErrorMsg,
    },
    getters: {
        isLogin: state => state.isLogin,
        accessError: state => state.accessError,
        accessErrorMsg: state => state.accessErrorMsg,
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
        }
    }
}