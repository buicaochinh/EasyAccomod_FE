<template>
  <div class="columns">
    <div class="column is-11">
      <input
        id="btn-input"
        type="text"
        name="message"
        class="input"
        placeholder="Type your message here..."
        v-model="newMessage"
        @keyup.enter="sendMessage"
      />
    </div>

    <div class="column is-1">
      <button
        class="button is-primary is-fullwidth"
        id="btn-chat"
        @click="sendMessage"
      >
        Gửi
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["user"],

  data() {
    return {
      newMessage: ""
    };
  },

  methods: {
    sendMessage() {
      this.$emit("messagesent", {
        message: this.newMessage
      });
      this.newMessage = "";
    }
  }
};
</script>
