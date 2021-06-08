import Cookies from 'js-cookie';
const user =
  Cookies.getJSON('user') || JSON.parse(sessionStorage.getItem('user'));

export default user;
