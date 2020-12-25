<template>
  <div class="wrapper">
    <h3 class="title is-3">Quản lý bình luận</h3>
    <table class="table is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>Nội dung</th>
          <th>Bài viết</th>
          <th>Người đăng</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(comment, index) in commentsPagination" :key="index">
          <td>{{ comment.content }}</td>
          <td>{{ comment.post.title }}</td>
          <td>{{ comment.from.name }}</td>
          <td>
            <button
              :class="[
                'button',
                'is-small',
                comment.status === 0 ? 'is-info' : 'is-success'
              ]"
              :disabled="comment.status === 1"
              @click="previewComment(comment.id, index)"
            >
              {{ comment.status === 1 ? "Đã duyệt" : "Duyệt" }}
            </button>
          </td>
          <td>
            <button
              class="button is-small is-danger"
              @click="deleteComment(comment.id, index)"
            >
              Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <b-pagination
      type="is-info"
      :total="comments.length"
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
      comments: [],
      current: 1
    };
  },
  computed: {
    commentsPagination() {
      let page = this.current;
      return [...pagination(this.comments, page)];
    }
  },
  created() {
    this.$emit("update:layout", "AdminLayout");
    setTimeout(() => {
      AdminServices.getAllComments().then(response => {
        this.comments = response.data.data;
      });
    }, 500);
  },
  methods: {
    previewComment(cid, index) {
      let arr = [...this.comments];
      this.comments = [
        ...arr.slice(0, index),
        {
          ...arr[index],
          status: 1
        },
        ...arr.slice(index + 1)
      ];
      AdminServices.postPreviewComment(cid, { _method: "PATCH", status: 1 });
    },
    deleteComment(cid, index) {
      this.comments.splice(index, 1);
      AdminServices.postDeleteComment(cid, { _method: "DELETE" });
    }
  }
};
</script>

<style scoped></style>
