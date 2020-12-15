<template>
  <div class="container">
    <div class="section">
      <h1 class="title is-1">
        404 Not Found
      </h1>
      <router-link :to="{ name: 'Home' }" class="button is-success"
        >Trang chủ</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$emit("update:layout", "div");
  }
};
</script>

<style scoped>
div.section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
