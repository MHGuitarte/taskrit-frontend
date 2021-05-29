
import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import UserService from '../service/UserService'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      guest: true,
      requiresAuth: false // not needed here, will need on later views (NOT NEEDED)
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!this.$cookies.isKey('user')) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      });
    } else {
      const { token } = JSON.parse(this.$cookies.get('user'));

      const isTokenCorrect = UserService.checkToken(token);

      if (isTokenCorrect) {
        next();
      } else {
        this.$cookies.remove('user');

        next({
          path: '/login',
          params: { nextUrl: to.fullPath }
        });
      }
    }
  }
});

export default router
