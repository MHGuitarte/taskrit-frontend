export default {
  get: (url, { token = undefined, requestBody = undefined }) => {
    return fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Auhtorization: token ? `Bearer ${token}` : undefined,
      },
      body: requestBody ? JSON.stringify(requestBody) : undefined,
    });
  },

  post: (url, { token = undefined, requestBody = undefined }) => {
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Auhtorization: token ? `Bearer ${token}` : undefined,
      },
      body: requestBody ? JSON.stringify(requestBody) : undefined,
    });
  },

  put: (url, { token = undefined, requestBody = undefined }) => {
    return fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Auhtorization: token ? `Bearer ${token}` : undefined,
      },
      body: requestBody ? JSON.stringify(requestBody) : undefined,
    });
  },

  delete: (url, { token = undefined, requestBody = undefined }) => {
    return fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Auhtorization: token ? `Bearer ${token}` : undefined,
      },
      body: requestBody ? JSON.stringify(requestBody) : undefined,
    });
  },
};
