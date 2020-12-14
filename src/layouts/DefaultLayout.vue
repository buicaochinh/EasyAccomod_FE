<template>
  <div class="layout-default">
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style scoped></style>
