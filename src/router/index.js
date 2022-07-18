import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import middleware from "@/router/middleware";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home-view",
    component: HomeView,
    beforeEnter: middleware,
  },

  {
    path: "/view_meetups",
    name: "view_meetups-view",
    component: () => import("../views/view_meetupsView.vue"),
    beforeEnter: middleware,
  },
  {
    path: "/view_meetups/:id",
    name: "meetup-view",
    props: true,
    component: () => import("../views/meetupView.vue"),
    beforeEnter: middleware,
  },
  {
    path: "/organize_meetup",
    name: "organize_meetup-view",
    component: () => import("../views/organize_meetupView.vue"),
    beforeEnter: middleware,
  },
  {
    path: "/profile",
    name: "profile-view",
    component: () => import("../views/profileView.vue"),
    beforeEnter: middleware,
  },
  {
    path: "/sign_up",
    name: "sign_up-view",
    component: () => import("../views/sign_upView.vue"),
  },
  {
    path: "/login",
    name: "login-view",
    component: () => import("../views/loginView.vue"),
  },
  {
    path: "/log_out",
    name: "logout-view",
    component: () => import("../views/log_outView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
