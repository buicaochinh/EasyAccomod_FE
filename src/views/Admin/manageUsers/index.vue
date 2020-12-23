<template>
  <div class="wrapper">
    Manage Users
  </div>
</template>

<script>
export default {
  created() {
    this.$emit("update:layout", "AdminLayout");
  }
};
</script>

<style scoped>
.router-link-exact-active {
  background-color: #7957d6;
  color: whitesmoke;
}
</style>
