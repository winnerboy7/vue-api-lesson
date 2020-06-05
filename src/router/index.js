import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
// import About from "@/views/About.vue";
// import Master from "@/views/Master.vue";
import Login from "@/views/Login.vue";
import Logout from "@/views/Logout.vue";
// import Team from "@/views/Team.vue";

import adminRoutes from "./admin"
import areaRoutes from "./area"

import { Role } from "@/middlewares/role";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    // meta: {
    //   requireAuth: true,
    // },
  },
  {
    path: "/master",
    name: "Master",
    component: () => import("@/views/Master"),
    meta: {
      requireAuth: true,
      roleAuth: Role.Area,
    },
  },
  {
    path: "/team",
    name: "Team",
    component: () => import("@/views/Team"),
  },
  {
    path: "/theme",
    name: "Theme",
    component: () => import("@/views/Theme"),
    meta: {
      layout: "ori",
    },
  },
  {
    path: "/theme2",
    name: "Theme2",
    component: () => import("@/views/Theme2"),
    meta: {
      layout: "ori",
    },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About"),
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      layout: "simple",
    },
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
  ...adminRoutes,
  ...areaRoutes,
];

const router = new VueRouter({
  routes,
});

export default router;

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/", "/login", "/register", "/about", "/theme", "/theme2"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");
  if (to.meta.requireAuth && store.state.account.user) {
    let loggedIn = store.state.account.status.loggedIn;
    let loginRole = store.state.account.user.role;

    console.log("AUTH : ", loginRole);
    if (loggedIn && loginRole === to.meta.roleAuth) {
      next();
    } else {
      return next("/login");
    }    
  } else if (authRequired && !loggedIn) {
    return next("/login");
  } else {
    next();
  }
});
