<template>
  <div class="nav-wrapper">
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <h1 class="title">
            <span style="color: dodgerblue">Easy</span
            ><span style="color: black">Accomod</span>
          </h1>
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item v-for="(category, index) in categories" :key="index">
          <router-link :to="{ name: 'Category', params: { id: category.id } }">
            {{ category.name }}
          </router-link>
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <router-link
              v-if="!user"
              class="button is-info"
              :to="{ name: 'Register' }"
            >
              <strong>Đăng ký</strong>
            </router-link>
            <router-link
              v-if="!user"
              class="button is-light"
              :to="{ name: 'Login' }"
            >
              Đăng nhập
            </router-link>
            <router-link
              v-if="user"
              class="button is-light"
              :to="{ name: 'User' }"
              >{{ user.name }}</router-link
            >
            <a v-if="user" class="button is-warning" @click="logout"
              >Đăng xuất</a
            >
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      categories: [
        {
          id: 1,
          name: "Chung cư"
        },
        {
          id: 2,
          name: "Phòng trọ cho thuê"
        },
        {
          id: 3,
          name: "Ở ghép"
        }
      ]
    };
  },
  created() {
    this.$store.dispatch("AUTH/getUserData").catch();
  },
  computed: {
    ...mapGetters("AUTH", ["user"])
  },
  methods: {
    logout() {
      this.$store.dispatch("AUTH/sendLogoutRequest");
    }
  }
};
</script>

<style scoped>
a {
  color: #2c3e50;
}

a:hover {
  color: dodgerblue;
}

label {
  color: #2c3e50;
}
</style>
