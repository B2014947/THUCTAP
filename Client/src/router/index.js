import { createRouter, createWebHashHistory } from 'vue-router';
import routerAdmin from './routerAD';
import store from '@/store';

const routes = [...routerAdmin];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta?.title ?? 'đéo có trang nào như vậy';

  const isLoggedIn = store.getters.isLoggedIn;

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
