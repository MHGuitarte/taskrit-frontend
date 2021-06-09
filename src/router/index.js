import Vue from 'vue';
import VueRouter from 'vue-router';
import UserService from '../service/UserService';
import Cookies from 'js-cookie';
import Home from '../views/Home';
import Boards from '../views/Boards';
import Board from '../views/Board';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/boards/:id',
    name: 'Boards',
    component: Boards,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/board/:id',
    name: 'Board',
    component: Board,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const user =
    await Cookies.getJSON('user') || await JSON.parse(sessionStorage.getItem('user'));

  const removeUser = () => {
    Cookies.remove('user');
    sessionStorage.removeItem('user');
  };

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!user?.token) {
      removeUser();

      next({
        name: 'Home',
        params: { nextUrl: to.fullPath, removeUser: true },
      });
    } else {
      const { token } = user;

      const isTokenCorrect = await UserService.checkToken(token);

      if (isTokenCorrect === true) {
        next();
      } else {
        removeUser();

        next({
          name: 'Home',
          params: { nextUrl: to.fullPath, removeUser: true },
        });
      }
    }
  } else {
    next();
  }
});

export default router;
