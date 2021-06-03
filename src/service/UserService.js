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
    return await ServiceHelper.post(checkTokenUrl, { token: userToken });
  },

  register: async (user) => {
    try {
      const { userId } = await ServiceHelper.post(registerUrl, {
        requestBody: user,
      });

      return !!userId;
    } catch (error) {
      return error;
    }
  },

  login: async (user) => {
    try {
      const credentials = await ServiceHelper.post(loginUrl, {
        requestBody: UserParser.parseLoginUser(user),
      });

      return credentials;
    } catch (error) {
      return error;
    }
  },
};

export default UserService;
