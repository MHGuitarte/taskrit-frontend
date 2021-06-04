import axios from 'axios';

export default {
  get: (url, { token = undefined, requestBody = undefined }) => {
    const axiosCaller = {
      url: url,
      bodyParameters: requestBody,
      headers: () => (token ? {Authorization: `Bearer ${token}`}: undefined)
    }
    return axios.get(axiosCaller);
  },

  post: (url, { token = undefined, requestBody = undefined }) => {
    const axiosCaller = {
      url: url,
      bodyParameters: requestBody,
      headers: () => (token ? {Authorization: `Bearer ${token}`}: undefined)
    }
    return axios.post(axiosCaller);
  },

  put: (url, { token = undefined, requestBody = undefined }) => {
    const axiosCaller = {
      url: url,
      bodyParameters: requestBody,
      headers: () => (token ? {Authorization: `Bearer ${token}`}: undefined)
    }
    return axios.put(axiosCaller);
  },

  delete: (url, { token = undefined, requestBody = undefined }) => {
    const axiosCaller = {
      url: url,
      bodyParameters: requestBody,
      headers: () => (token ? {Authorization: `Bearer ${token}`}: undefined)
    }
    return axios.delete(axiosCaller);
  },
};
