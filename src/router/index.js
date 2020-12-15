import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views";
import Login from "../views/login";
import Register from "../views/register";
import Category from "../views/category";
import User from "../views/user";
import Room from "../views/room";
import NotFound from "../views/404";

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
    path: "*",
    name: "404",
    component: NotFound
  },
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
  },
  {
    path: "/room/:slug",
    name: "Room",
    component: Room
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
