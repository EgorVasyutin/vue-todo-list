// import { createRouter, createWebHistory } from "vue-router/dist/vue-router";





import RegForm from "@/pages/RegForm.vue";
import MainPage from "@/pages/MainPage.vue";
import LogForm from "@/pages/LogForm.vue";

const routes = [
  {
    path: "/",
    component: MainPage,
  },
  {
    path: "/register",
    component: RegForm,
  },
  {
    path: "/login",
    component: LogForm,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
