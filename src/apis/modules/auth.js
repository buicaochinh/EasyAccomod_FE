import api from "../../apis";
export default {
  login(data) {
    return api().post("/api/auth/login", data);
  },
  register(data) {
    return api().post("/api/auth/signup", data);
  },
  getUser() {
    return api().get("/api/auth/user");
  },
  logout() {
    return api().get("/api/auth/logout");
  }
};
