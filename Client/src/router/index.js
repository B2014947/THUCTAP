import { createRouter, createWebHashHistory } from "vue-router";
import routerAdmin from "./routerAD";


const routes = [...routerAdmin];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta?.title ?? "đéo có trang nào như vậy ";
  next();
});
export default router;