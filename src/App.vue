<template>
  <div id="app">
    <component :is="layout">
      <router-view :layout.sync="layout" />
    </component>
  </div>
</template>

<script>
import DefaultLayout from "./layouts/DefaultLayout";
export default {
  data() {
    return {
      layout: "DefaultLayout"
    };
  },
  components: {
    DefaultLayout
  }
};
</script>
