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
                  ($store.getters['AUTH/user'].id_role === 3 ||
                    $store.getters['AUTH/user'].id_role === 2)
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
            <button
              v-if="
                $store.getters['AUTH/user'] &&
                  ($store.getters['AUTH/user'].id_role === 3 ||
                    $store.getters['AUTH/user'].id_role === 2)
              "
              class="button is-light"
            >
              <b-navbar-dropdown label="Thông báo">
                <b-navbar-item
                  v-for="(notification, index) in notifications"
                  :key="index"
                >
                  {{ notification.content }}
                </b-navbar-item>
              </b-navbar-dropdown>
            </button>
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
export default {
  data() {
    return {
      notifications: []
    };
  },
  computed: {
    categories() {
      return this.$store.getters["HOME/categories"];
    }
  },
  created() {
    this.$store.dispatch("AUTH/getUserData");
    this.$store.dispatch("HOME/getCategory");
  },
  methods: {
    logout() {
      this.$store.dispatch("AUTH/sendLogoutRequest");
    }
  }
};
</script>

<style scoped>
.nav-wrapper {
  padding: 5px 0;
}

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
