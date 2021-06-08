import Cookies from 'js-cookie';
const User = {
  exists: () => Cookies.get('user') || sessionStorage.getItem('user'),

  getUser:
    Cookies.getJSON('user') || JSON.parse(sessionStorage.getItem('user')),

  removeUser: () => {
    Cookies.remove('user');
    sessionStorage.removeItem('user');
  },

  setUser: (user, saveLogin = false) => {
    if (saveLogin) {
      Cookies.set(
        'user',
        JSON.stringify({
          id: user.id,
          username: user.username,
          token: user.token,
        }),
        { expires: 7, sameSite: 'none', secure: true }
      );
    } else {
      sessionStorage.setItem(
        'user',
        JSON.stringify({
          id: user.id,
          username: user.username,
          token: user.token,
        })
      );
    }
  },
};

export default User;
