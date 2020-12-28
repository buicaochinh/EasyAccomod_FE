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
  border: 1px solid #2f4f4f;
  margin-bottom: 10px;
  margin-top: 10px;
  border-radius: 8px;
  background-color: antiquewhite;
}
.primary-font {
  color: brown;
}
</style>
