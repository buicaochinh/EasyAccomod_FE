<template>
  <div class="container">
    <h3 class="title-comm">
      <span class="title-holder">{{ $route.params.id }}</span>
    </h3>
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
