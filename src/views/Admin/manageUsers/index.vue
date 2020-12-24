<template>
  <div class="wrapper">
    <h3 class="title is-3">Quản lý tài khoản</h3>
    <table class="table is-fullwidth is-hoverable">
      <thead>
        <tr>
          <th>Email</th>
          <th>Tên</th>
          <th>Số điện thoại</th>
          <th>Loại tài khoản</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in postsPagination" :key="index">
          <td>{{ user.email }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.phone }}</td>
          <td>
            <span
              :class="[
                'tag',
                user.id_role === 1 ? 'is-success' : '',
                user.id_role === 2 ? 'is-danger' : '',
                user.id_role === 3 ? 'is-warning' : ''
              ]"
              >{{ user.role }}</span
            >
          </td>
          <td>
            <router-link
              class="button is-small is-info"
              :to="{ name: 'AdminEditUser', params: { id: user.id } }"
            >
              Sửa
            </router-link>
          </td>
          <td>
            <button
              class="button is-small is-danger"
              @click="deleteUser(user.id, index)"
            >
              Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <router-link :to="{ name: 'AdminAddUser' }" class="button mb-5 is-primary"
      >Thêm mới</router-link
    >
    <b-pagination
      type="is-info"
      :total="users.length"
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
      users: [],
      current: 1
    };
  },
  computed: {
    postsPagination() {
      let page = this.current;
      return [...pagination(this.users, page)];
    }
  },
  created() {
    this.$emit("update:layout", "AdminLayout");
    setTimeout(() => {
      AdminServices.getAllUsers().then(response => {
        this.users = response.data.data;
      });
    }, 500);
  },
  methods: {
    deleteUser(uid, index) {
      this.users.splice(index, 1);
      AdminServices.postDeleteUser(uid, { _method: "DELETE" });
    }
  }
};
</script>

<style scoped></style>
