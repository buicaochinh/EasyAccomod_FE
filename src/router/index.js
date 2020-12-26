import Vue from "vue";
import VueRouter from "vue-router";

// Services

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
import Chat from "../views/chat";
import EditPost from "../views/editPost";

// For Admin Pages
import Admin from "../views/Admin";
import AdminLogin from "../views/Admin/AdminLogin";
import ManageUsers from "../views/Admin/manageUsers";
import ManagePosts from "../views/Admin/managePosts";
import AdminAddPost from "@/views/Admin/managePosts/AdminAddPost";
import AdminAddUser from "@/views/Admin/manageUsers/AdminAddUser";
import AdminEditUser from "@/views/Admin/manageUsers/AdminEditUser";
import AdminPreviewPost from "@/views/Admin/managePosts/AdminPreviewPost";
import ManageComments from "@/views/Admin/manageComments";
import ManageReports from "@/views/Admin/manageReports";

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
      requiresAuth: true,
      allowsRole: 2
    }
  },
  {
    path: "/admin/login",
    name: "AdminLogin",
    beforeEnter: adminLogin,
    component: AdminLogin,
    meta: {
      requiresAuth: true,
      allowsRole: 2
    }
  },
  {
    path: "/admin/manage_users",
    name: "ManageUsers",
    component: ManageUsers,
    meta: {
      requiresAuth: true,
      allowsRole: 2
    }
  },
  {
    path: "/admin/manage_users/add",
    name: "AdminAddUser",
    component: AdminAddUser,
    meta: {
      requiresAuth: true,
      allowsRole: 2
    }
  },
  {
    path: "/admin/manage_users/edit/:id",
    name: "AdminEditUser",
    component: AdminEditUser,
    meta: {
      requiresAuth: true,
      allowsRole: 2
    }
  },
  {
    path: "/admin/manage_posts",
    name: "ManagePosts",
    component: ManagePosts,
    meta: {
      requiresAuth: true,
      allowsRole: 2
    }
  },
  {
    path: "/admin/manage_posts/add",
    name: "AdminAddPost",
    component: AdminAddPost,
    meta: {
      requiresAuth: true,
      allowsRole: 2
    }
  },
  {
    path: "/admin/manage_posts/preview/:id",
    name: "AdminPreviewPost",
    component: AdminPreviewPost,
    meta: {
      requiresAuth: true,
      allowsRole: 2
    }
  },
  {
    path: "/admin/manage_comments",
    name: "ManageComments",
    component: ManageComments,
    meta: {
      requiresAuth: true,
      allowsRole: 2
    }
  },
  {
    path: "/admin/manage_reports",
    name: "ManageReports",
    component: ManageReports,
    meta: {
      requiresAuth: true,
      allowsRole: 2
    }
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
    path: "/edit_post/:id",
    name: "EditPost",
    component: EditPost
  },
  {
    path: "/search",
    name: "Search",
    component: SearchPage
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [...NormalRoutes, ...AdminRoutes]
});

export default router;
