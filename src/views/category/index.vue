<template>
  <div class="container">
    <div class="section">
      <h3 class="title-comm">
        <span class="title-holder">{{ $route.params.id }}</span>
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      rooms: []
    };
  },
  created() {
    this.$emit("update:layout", "DefaultLayout");
  }
};
</script>

<style scoped></style>
