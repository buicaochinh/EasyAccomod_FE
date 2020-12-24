<template>
  <article class="panel is-primary">
    <p class="panel-heading">
      {{ title }}
    </p>
    <a class="panel-block" v-for="(item, index) in data" :key="index">
      {{ item[idKey] }}
    </a>
  </article>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    data: {
      type: Object
    },
    idKey: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped></style>
