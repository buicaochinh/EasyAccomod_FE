import api from "../../apis";
export default {
  getRoom() {
    return api().get("/api/home");
  },
  getAllProvinces() {
    return api().get("/api/get_all_provinces");
  },
  getDistrictsByIdProvince(id_province) {
    return api().get(`/api/get_district_by_id_province/${id_province}`);
  },
  getWardsByIdDistrict(id_district) {
    return api().get(`/api/get_ward_by_id_district/${id_district}`);
  },
  getCategory() {
    return api().get("/api/get_all_room_type");
  },
  postFilter(data) {
    return api().post("/api/filter", data);
  },
  postNewPost(data) {
    return api().post("/api/new_post", data);
  }
};
