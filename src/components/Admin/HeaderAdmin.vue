<template>
  <b-navbar type="is-light">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ name: 'Dashboard' }">
        <h3 class="title is-3">
          <span style="color: #7957d6">Easy</span
          ><span style="color: black">Accomod</span>
          <span class="tag is-primary is-light">Admin</span>
        </h3>
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-dropdown label="Thông báo"></b-navbar-dropdown>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-light">
            <span v-if="user">{{ user.name }}</span>
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("AUTH", ["user"])
  }
};
</script>

<style scoped>
span.tag {
  position: relative;
  bottom: 10px;
}
</style>
