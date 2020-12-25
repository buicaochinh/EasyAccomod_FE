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
  getAPost(id) {
    return api().get(`/api/post/${id}`);
  },
  getComments(id) {
    return api().get(`/api/comment/${id}`);
  },
  getPostPosted() {
    return api().get("/api/get_post_posted");
  },
  getFavPost() {
    return api().get("/api/get_fav_post");
  },
  // [POST] api
  postFilter(data) {
    return api().post("/api/filter", data);
  },
  postNewPost(data) {
    return api().post("/api/new_post", data, config);
  },
  postAddFavorite(id) {
    return api().post(`/api/add_fav/${id}`);
  },
  postRemoveFavorite(id) {
    return api().post(`/api/remove_fav/${id}`);
  },
  postComment(id, data) {
    return api().post(`/api/comment/${id}`, data);
  },
  postReport(id, data) {
    return api().post(`/api/report/${id}`, data);
  }
};
