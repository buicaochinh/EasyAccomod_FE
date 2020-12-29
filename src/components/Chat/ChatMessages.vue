<template>
  <ul class="chat">
    <li v-for="(message, index) in messages" :key="index">
      <div class="wrapper">
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
ul.chat {
  border: 1px solid #ddd;
  border-radius: 5px;
}

li {
  padding-top: 0.3rem;
  margin: 1rem 0;
  padding-left: 1rem;
  padding-right: 1rem;
}

li > .wrapper {
  border-radius: 0.8rem;
  padding: 1rem 2rem;
  background-color: #eeeeee;
}

.primary-font {
  color: #367df0;
}
</style>
