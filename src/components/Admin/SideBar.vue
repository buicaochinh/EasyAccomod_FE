<template>
  <section class="main-content columns is-fullheight">
    <aside class="column is-2 is-narrow-mobile is-fullheight section">
      <b-menu>
        <b-menu-list label="Menu">
          <b-menu-item
            label="Dashboard"
            tag="router-link"
            :to="{ name: 'Dashboard' }"
          ></b-menu-item>
          <b-menu-item
            label="Quản lý tài khoản"
            tag="router-link"
            :to="{ name: 'ManageUsers' }"
          ></b-menu-item>
          <b-menu-item
            label="Quản lý bài đăng"
            tag="router-link"
            :to="{ name: 'ManagePosts' }"
          ></b-menu-item>
          <b-menu-item
            label="Quản lý bình luận"
            tag="router-link"
            :to="{ name: 'ManageComments' }"
          ></b-menu-item>
          <b-menu-item
            label="Quản lý báo cáo"
            tag="router-link"
            :to="{ name: 'ManageReports' }"
          ></b-menu-item>
          <b-menu-item
            label="Trang chủ"
            tag="router-link"
            target="_blank"
            :to="{ name: 'Home' }"
          ></b-menu-item>
        </b-menu-list>
        <b-menu-list label="Actions">
          <b-menu-item
            label="Chat"
            tag="router-link"
            :to="{ name: 'Chat' }"
          ></b-menu-item>
          <b-menu-item label="Đăng xuất" @click="logout"></b-menu-item>
        </b-menu-list>
      </b-menu>
    </aside>

    <div class="column is-10">
      <div class="section">
        <slot />
      </div>
    </div>
  </section>
</template>

<script>
import router from "@/router";

export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.dispatch("AUTH/sendLogoutRequest");
      router.push({ name: "AdminLogin" });
    }
  }
};
</script>

<style scoped>
.main-content {
  height: 100vh;
}

@media screen and (max-width: 768px) {
  #menu-toggle:checked + .nav-menu {
    display: block;
  }
}
</style>
