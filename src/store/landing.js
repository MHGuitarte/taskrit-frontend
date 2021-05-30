export default {
    namespaced: true,
    state: {
        isLogin: false,
    },
    mutations: {
        isLogin: (state, isLogin) => state.isLogin = isLogin,
    },
    getters: {
        isLogin: state => state.isLogin,
    },
    actions: {
        changeLoginPage({ state, commit }) {
            commit('isLogin', !state.isLogin)
        }
    }
}