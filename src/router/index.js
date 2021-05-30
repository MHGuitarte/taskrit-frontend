
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
      requiresAuth: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
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
  } else {
    next();
  }
});

export default router
