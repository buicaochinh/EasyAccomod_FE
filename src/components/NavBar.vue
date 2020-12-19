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
              v-if="!$store.getters['AUTH/user']"
              class="button is-info"
              :to="{ name: 'Register' }"
            >
              <strong>Đăng ký</strong>
            </router-link>
            <router-link
              v-if="!$store.getters['AUTH/user']"
              class="button is-light"
              :to="{ name: 'Login' }"
            >
              Đăng nhập
            </router-link>
            <router-link
              v-if="
                $store.getters['AUTH/user'] &&
                  $store.getters['AUTH/user'].id_role === 3
              "
              class="button is-success"
              :to="{ name: 'NewPost' }"
              >Đăng tin</router-link
            >
            <router-link
              v-if="$store.getters['AUTH/user']"
              class="button is-light"
              :to="{ name: 'User' }"
              >{{ $store.getters["AUTH/user"].name }}</router-link
            >
            <a
              v-if="$store.getters['AUTH/user']"
              class="button is-warning"
              @click="logout"
              >Đăng xuất</a
            >
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
import HomeServices from "../apis/modules/home";

export default {
  data() {
    return {
      categories: []
    };
  },
  created() {
    this.$store.dispatch("AUTH/getUserData");
    setTimeout(() => {
      HomeServices.getCategory().then(response => {
        this.categories = response.data.room_types;
      });
    }, 500);
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
