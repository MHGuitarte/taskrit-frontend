const API_URL = "http://localhost:8080";

const checkTokenUrl = `${API_URL}/user/checkToken`;
const registerUrl = `${API_URL}/user/register`;
const loginUrl = `${API_URL}/user/login`;

const UserParser = {

    parseLoginUser: ({ username, password, save }) => ({
        username,
        password,
        saveLogin: save
    })
}

const UserService = {

    checkToken: async userToken => {
        const isTokenValid = await this.$http.post(checkTokenUrl, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        return isTokenValid;
    },

    login: async user => {
        try {
            const credentials = await this.$http.post(loginUrl, UserParser.parseLoginUser(user));

            return credentials;
        } catch (error) {
            return error;
        }
    }

}

export default {
    namespaced: true,
    state: {
        user: {
            id: '',
            username: '',
        }
    },
    mutations: {
        user: (state, user) => state.user = user,
    },
    getters: {
        getUser: state => state.user,
    },
    actions: {
        async registerUser({ dispatch }, user) {
            try {

                if (userId) {
                    dispatch("access/changeLoginPage", null, { root: true });
                } else {
                    dispatch("access/accessError", null, { root: true });
                    dispatch("access/accessErrorMsg", 'Error durante el registro de usuario. Inténtelo más tarde', { root: true });
                }

            } catch (error) {
                dispatch("access/accessError", null, { root: true });
                dispatch("access/accessErrorMsg", 'Error durante el registro de usuario. Inténtelo más tarde', { root: true });
                return error;
            }

        },
        async loginUser({ commit }, { user, password, save = false }) {
            const { id, username, token, saveLogin } = UserService.login({ user, password, save });

            commit("user", { id, username });
            this.$cookies.set('token', token, saveLogin ? '1w' : '2d');

            //TODO: como manejar errores

        }
    },
}
