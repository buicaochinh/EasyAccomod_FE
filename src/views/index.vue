<template>
  <div>
    <Search />
    <div class="container">
      <div class="section">
        Hello Home Page
      </div>
    </div>
  </div>
</template>

<script>
import Search from "../components/Search";
export default {
  components: {
    Search
  },
  created() {
    this.$emit("update:layout", "DefaultLayout");
  }
};
</script>
