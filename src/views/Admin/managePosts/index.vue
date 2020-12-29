<template>
  <div class="wrapper">
    <h3 class="title is-3">Quản lý bài đăng</h3>
    <table class="table is-fullwidth is-hoverable">
      <thead>
        <tr>
          <th>Tiêu đề</th>
          <th>Danh mục</th>
          <th>Lượt xem</th>
          <th>Tình trạng</th>
          <th>Kiểm duyệt</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(post, index) in postsPagination" :key="index">
          <td>{{ post.title }}</td>
          <td>{{ post.room_type }}</td>
          <td>{{ post.views }}</td>
          <td>
            <span
              :class="[
                'tag',
                post.is_rented === 1 ? 'is-danger' : 'is-success'
              ]"
              >{{ post.is_rented === 1 ? "Đã được thuê" : "Còn phòng" }}</span
            >
          </td>
          <td>
            <span
              :class="['tag', post.status === 1 ? 'is-success' : 'is-warning']"
              >{{
                post.status === 1
                  ? "Đã được kiểm duyệt"
                  : "Chưa được kiểm duyệt"
              }}</span
            >
          </td>
          <td>
            <router-link
              :to="{ name: 'AdminPreviewPost', params: { id: post.id } }"
              class="button is-info is-small"
              >Duyệt</router-link
            >
          </td>
          <td>
            <button
              class="button is-danger is-small"
              @click="deletePost(post.id, index)"
              :disabled="post.status === 1"
            >
              Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <router-link :to="{ name: 'AdminAddPost' }" class="button is-primary mb-5"
      >Thêm mới</router-link
    >
    <b-pagination
      type="is-info"
      :total="posts.length"
      v-model="current"
      :range-before="2"
      :range-after="2"
      order="is-centered"
      side="default"
      :simple="false"
      :rounded="false"
      :per-page="10"
      icon-prev="chevron-left"
      icon-next="chevron-right"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
    >
    </b-pagination>
  </div>
</template>

<script>
import AdminServices from "../../../apis/modules/admin";
import { pagination } from "@/services/pagination";
export default {
  data() {
    return {
      posts: [],
      current: 1
    };
  },
  computed: {
    postsPagination() {
      let page = this.current;
      return [...pagination(this.posts, page)];
    }
  },
  created() {
    this.$emit("update:layout", "AdminLayout");
    setTimeout(() => {
      AdminServices.getAllPosts().then(response => {
        this.posts = response.data.data;
      });
    }, 500);
  },
  methods: {
    deletePost(pid, index) {
      this.posts.splice(index, 1);
      AdminServices.postDeletePost(pid, { _method: "DELETE" });
    }
  }
};
</script>

<style scoped></style>
