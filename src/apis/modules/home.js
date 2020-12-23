import api from "../../apis";
import requestHeaders from "../../configs/requestHeaders";

const config = requestHeaders.headersFormData;

export default {
  // [GET] api
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
  getImage(link) {
    return api().get(`/api/get_img/${link}`);
  },
  getComments() {
    return api().get(`/api/comment`);
  },
  // [POST] api
  postFilter(data) {
    return api().post("/api/filter", data);
  },
  postNewPost(data) {
    return api().post("/api/new_post", data, config);
  },
  postAddFavorite(data) {
    return api().post(`/api/add_fav/${data.id}`, data);
  },
  postRemoveFavorite(data) {
    return api().post(`/api/remove_fav/${data.id}`, data);
  },
  postComment(data) {
    return api().post(`/api/comment/${data.id}`, data);
  }
};
