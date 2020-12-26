import api from "../../apis";
export default {
  // [GET] api
  getStatistic() {
    return api().get("/api/admin/get_statistic");
  },
  getAllPosts() {
    return api().get("/api/admin/posts");
  },
  getAllUsers() {
    return api().get("/api/admin/users");
  },
  getPostById(id) {
    return api().get(`/api/admin/posts/${id}`);
  },
  getUserById(id) {
    return api().get(`/api/admin/users/${id}`);
  },
  getAllComments() {
    return api().get("/api/admin/comments");
  },
  getAllReports() {
    return api().get("/api/admin/reports");
  },
  // [POST] api
  postPreviewPost(id, data) {
    return api().post(`/api/admin/posts/${id}`, data);
  },
  postDeletePost(id, data) {
    return api().post(`/api/admin/posts/${id}`, data);
  },
  postAddUser(data) {
    return api().post("/api/admin/users", data);
  },
  postEditUser(id, data) {
    return api().post(`/api/admin/users/${id}`, data);
  },
  postDeleteUser(id, data) {
    return api().post(`/api/admin/users/${id}`, data);
  },
  postPreviewComment(id, data) {
    return api().post(`/api/admin/comments/${id}`, data);
  },
  postDeleteComment(id, data) {
    return api().post(`/api/admin/comments/${id}`, data);
  },
  postPreviewReport(id, data) {
    return api().post(`/api/admin/reports/${id}`, data);
  },
  postDeleteReport(id, data) {
    return api().post(`/api/admin/reports/${id}`, data);
  },
  postSendNotification(id, data) {
    return api().post(`/api/admin/send_notification/${id}`, data);
  }
};
