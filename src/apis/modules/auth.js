import api from "../../apis";
export default {
  // [POST] api
  login(data) {
    return api().post("/api/auth/login", data);
  },
  register(data) {
    return api().post("/api/auth/signup", data);
  },
  // [GET] api
  getUser() {
    return api().get("/api/auth/user");
  },
  logout() {
    return api().get("/api/auth/logout");
  }
};
