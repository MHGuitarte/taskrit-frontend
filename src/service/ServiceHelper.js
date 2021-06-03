export default (
  url,
  { method = 'GET', auth = undefined, requestBody = undefined }
) => {
  return fetch(url, {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Auhtorization: auth ? `Bearer ${auth}` : undefined,
    },
    body: requestBody ? JSON.stringify(requestBody) : undefined,
  });
};
