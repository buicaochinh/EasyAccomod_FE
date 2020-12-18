import api from "../../apis";
export default {
  changePassword(data) {
    return api().post("/api/change_password", data);
  },
  editProfile(data) {
    return api().post("/api/edit_profile", data);
  }
};
