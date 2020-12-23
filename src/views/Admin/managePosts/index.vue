<template>
  <div class="wrapper">
    Manage Posts
  </div>
</template>

<script>
export default {
  created() {
    this.$emit("update:layout", "AdminLayout");
  }
};
</script>

<style scoped></style>
