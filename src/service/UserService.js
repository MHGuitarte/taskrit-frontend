import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:8080';

const checkTokenUrl = `${API_URL}/user/checkToken`;
const registerUrl = `${API_URL}/user/register`;
const loginUrl = `${API_URL}/user/login`;


const parseLoginUser = ({ username, password }) => ({
  username,
  password,
  saveLogin: false,
});

const UserService = {
  checkToken: async (userToken) => {
    try {
      return await (await axios.post(checkTokenUrl, null, { headers: { Authorization: `Bearer ${userToken}` } })).data;
    } catch {
      return false;
    }
  },

  register: async (user) => {
    try {
      const registeredUser = await (await axios.post(registerUrl, user)).data

      return registeredUser?.userId;
    } catch (error) {
      return error;
    }
  },

  login: async (user) => {
    try {
      const credentials = await (await axios.post(loginUrl, parseLoginUser(user))).data;

      return credentials;
    } catch (error) {
      return error;
    }
  },
};

export default UserService;
