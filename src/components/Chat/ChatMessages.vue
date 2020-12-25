<template>
  <ul class="chat">
    <li v-for="(message, index) in messages" :key="index">
      <div class="temp">
        <div class="header">
          <strong class="primary-font">
            {{ message.username }}
          </strong>
        </div>
        <p>
          {{ message.text }}
        </p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["messages"]
};
</script>

<style scoped>
li {
  border-top: 1px solid #ddd;
}
</style>
