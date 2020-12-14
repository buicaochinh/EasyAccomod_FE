<template>
  <div class="container">
    <div class="section">
      Hello Home Page
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  created() {
    this.$emit("update:layout", "DefaultLayout");
  }
};
</script>
