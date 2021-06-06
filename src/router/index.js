import Vue from 'vue';
import VueRouter from 'vue-router';
import UserService from '../service/UserService';
import Cookies from 'js-cookie';

import Home from '../views/Home';
import Boards from '../views/Boards';

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
    path: '/boards',
    name: 'Boards',
    component: Boards,
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

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!Cookies.get('user') && !sessionStorage.getItem('user')) {
      next({
        path: '/',
        params: { nextUrl: to.fullPath },
      });
    } else {
      const { token } =
        Cookies.getJSON('user') ||
        JSON.parse(sessionStorage.getItem('user'));

      const isTokenCorrect = UserService.checkToken(token);

      if (isTokenCorrect) {
        next();
      } else {
        Cookies.remove('user');
        sessionStorage.removeItem('user');

        next({
          path: '/',
          params: { nextUrl: to.fullPath },
        });
      }
    }
  } else {
    next();
  }
});

export default router;
