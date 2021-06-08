import Vue from 'vue';
import VueRouter from 'vue-router';
import UserService from '../service/UserService';

import Home from '../views/Home';
import Boards from '../views/Boards';
import Board from '../views/Board';
import User from '../utils/User';

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
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!User.exists) {
      next({
        name: "Home",
        params: { nextUrl: to.fullPath },
      });
    } else {
      const { token } = await User.getUser;

      const isTokenCorrect = await UserService.checkToken(token);

      if (isTokenCorrect === true) {
        next();
      } else {
        User.removeUser();

        next({
          name: "Home",
          params: { nextUrl: to.fullPath },
        });
      }
    }
  } else {
    next();
  }
});

export default router;
