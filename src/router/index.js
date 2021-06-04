import Vue from 'vue';
import VueRouter from 'vue-router';
import UserService from '../service/UserService';
import Home from '../views/Home.vue';

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
    component: () => require('@/views/Boards'),
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
    if (!this.$cookies.isKey('user') || !sessionStorage.getItem('user')) {
      next({
        path: '/',
        params: { nextUrl: to.fullPath },
      });
    } else {
      const { token } =
        JSON.parse(this.$cookies.get('user')) ||
        JSON.parse(sessionStorage.getItem('user'));

      const isTokenCorrect = UserService.checkToken(token);

      if (isTokenCorrect) {
        next();
      } else {
        this.$cookies.remove('user');
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
