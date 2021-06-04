import ServiceHelper from './ServiceHelper';

const API_URL = 'http://localhost:8080';

const checkTokenUrl = `${API_URL}/user/checkToken`;
const registerUrl = `${API_URL}/user/register`;
const loginUrl = `${API_URL}/user/login`;

const UserParser = {
  parseLoginUser: ({ user, password }) => ({
    username: user,
    password,
    saveLogin: false,
  }),
};

const UserService = {
  checkToken: async (userToken) => {
    return await ServiceHelper.post(checkTokenUrl, { token: userToken });
  },

  register: (user) => {
    try {
      const registeredUser = ServiceHelper.post(registerUrl, {
        requestBody: user,
      }).then((response) => response.json());

      return registeredUser?.userId;
    } catch (error) {
      return error;
    }
  },

  login: (user) => {
    try {
      const credentials = ServiceHelper.post(loginUrl, {
        requestBody: UserParser.parseLoginUser(user),
      }).then((response) => console.log(response.json()));

      return credentials;
    } catch (error) {
      return error;
    }
  },
};

export default UserService;
