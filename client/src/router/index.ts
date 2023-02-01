import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import gurad from "./guard";

import pdf from "../views/pdf/pdf.vue";
import login from "../views/login/login.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    name: "pdf",
    path: "/pdf",
    component: pdf,
  },
  {
    name: "login",
    path: "/login",
    component: login,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

gurad(router);

export default router;
