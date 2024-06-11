import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue"
import kasir from "../components/kasir.vue";
import Coba from "@/components/coba.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/kasir",
      name: "kasir",
      component: kasir,
    },
    {
      path: "/coba",
      name: "coba",
      component: Coba,
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
