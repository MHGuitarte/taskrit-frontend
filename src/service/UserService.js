import ServiceHelper from './ServiceHelper';

const API_URL = 'http://localhost:8080';

const checkTokenUrl = `${API_URL}/user/checkToken`;
const registerUrl = `${API_URL}/user/register`;
const loginUrl = `${API_URL}/user/login`;

const UserParser = {
  parseLoginUser: ({ username, password, save }) => ({
    username,
    password,
    saveLogin: save,
  }),
};

const UserService = {
  checkToken: async (userToken) => {
    const isTokenValid = await this.$http.post(checkTokenUrl, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    return isTokenValid;
  },

  register: async user => {
    try {
      const { userId } = await ServiceHelper(registerUrl, {
        method: 'POST',
        requestBody: user,
      });

      return !!userId;
    } catch (error) {
      return error;
    }
  },

  login: async (user) => {
    try {
      const credentials = await this.$http.post(
        loginUrl,
        UserParser.parseLoginUser(user)
      );

      return credentials;
    } catch (error) {
      return error;
    }
  },
};

export default UserService;
