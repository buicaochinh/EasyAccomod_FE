import api from "../../apis";
export default {
  // [POST] api
  changePassword(data) {
    return api().post("/api/change_password", data);
  },
  editProfile(data) {
    return api().post("/api/edit_profile", data);
  }
  // [GET] api
};
