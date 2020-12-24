import Vue from "vue";
import VueRouter from "vue-router";

// For Normal Pages
import Home from "../views";
import Login from "../views/login";
import Register from "../views/register";
import Category from "../views/category";
import User from "../views/user";
import Room from "../views/room";
import NotFound from "../views/404";
import ChangePassword from "../views/user/changePassword";
import ChangeInformation from "../views/user/changeInfomation";
import NewPost from "../views/newPost";
import SearchPage from "../views/searchPage";

// For Admin Pages
import Admin from "../views/Admin";
import AdminLogin from "../views/Admin/AdminLogin";
import ManageUsers from "../views/Admin/manageUsers";
import ManagePosts from "../views/Admin/managePosts";
import AdminAddPost from "@/views/Admin/managePosts/AdminAddPost";
import AdminAddUser from "@/views/Admin/manageUsers/AdminAddUser";
import AdminEditUser from "@/views/Admin/manageUsers/AdminEditUser";
import AdminPreviewPost from "@/views/Admin/managePosts/AdminPreviewPost";

Vue.use(VueRouter);

const guest = (to, from, next) => {
  if (!localStorage.getItem("authToken")) {
    return next();
  } else {
    return next("/");
  }
};

const adminLogin = (to, from, next) => {
  if (!localStorage.getItem("authToken")) {
    return next({ name: "AdminLogin" });
  } else {
    return next({ name: "Dashboard" });
  }
};

// Admin Routes
const AdminRoutes = [
  {
    path: "/admin",
    name: "Dashboard",
    component: Admin,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/admin/login",
    name: "AdminLogin",
    beforeEnter: adminLogin,
    component: AdminLogin
  },
  {
    path: "/admin/manage_users",
    name: "ManageUsers",
    component: ManageUsers,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/admin/manage_users/add",
    name: "AdminAddUser",
    component: AdminAddUser
  },
  {
    path: "/admin/manage_users/edit/:id",
    name: "AdminEditUser",
    component: AdminEditUser
  },
  {
    path: "/admin/manage_posts",
    name: "ManagePosts",
    component: ManagePosts,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/admin/manage_posts/add",
    name: "AdminAddPost",
    component: AdminAddPost
  },
  {
    path: "/admin/manage_posts/preview/:id",
    name: "AdminPreviewPost",
    component: AdminPreviewPost
  }
];

// Normal Routes
const NormalRoutes = [
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
    path: "/room/:id",
    name: "Room",
    component: Room
  },
  {
    path: "/user/change_password",
    name: "ChangePassword",
    component: ChangePassword
  },
  {
    path: "/user/change_information",
    name: "ChangeInformation",
    component: ChangeInformation
  },
  {
    path: "/new_post",
    name: "NewPost",
    component: NewPost
  },
  {
    path: "/search",
    name: "Search",
    component: SearchPage,
    props: route => ({
      category: route.query.category,
      wardId: route.query.wardId,
      withOwner: route.query.owner,
      restroom: route.query.restroom,
      kitchen: route.query.kitchen,
      waterHeater: route.query.waterHeater,
      airConditioner: route.query.airConditioner,
      balcony: route.query.balcony,
      squareMax: route.query.squareMax,
      squareMin: route.query.squareMin,
      priceMax: route.query.priceMax,
      priceMin: route.query.priceMin
    })
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [...NormalRoutes, ...AdminRoutes]
});

export default router;
