import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views";
import Login from "../views/login";
import Register from "../views/register";
import Category from "../views/category";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/category/:id",
    name: "Category",
    component: Category
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
