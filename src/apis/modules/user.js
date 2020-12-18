import api from "../../apis";
export default {
  changePassword(data) {
    return api().post("/api/change_password", data);
  }
};
