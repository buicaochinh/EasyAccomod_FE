import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views";
import Login from "../views/login";
import Register from "../views/register";
import Category from "../views/category";
import User from "../views/User";

Vue.use(VueRouter);

const guest = (to, from, next) => {
  if (!localStorage.getItem("authToken")) {
    return next();
  } else {
    return next("/");
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    beforeEnter: guest,
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    beforeEnter: guest,
    component: Register
  },
  {
    path: "/category/:id",
    name: "Category",
    component: Category
  },
  {
    path: "/user",
    name: "User",
    component: User
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
