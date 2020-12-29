<template>
  <div class="container">
    <div class="wrapper">
      <div class="title is-3 mt-5" style="text-align: center">
        DIỄN ĐÀN THẢO LUẬN
      </div>
      <div class="body">
        <chat-messages :messages="messages"></chat-messages>
      </div>
      <div class="footer">
        <chat-form
          v-on:messagesent="addMessage($event)"
          :user="$store.getters['AUTH/user']"
        ></chat-form>
      </div>
    </div>
  </div>
</template>

<script>
import fire from "../../plugins/firebase";

import ChatMessages from "@/components/Chat/ChatMessages";
import ChatForm from "@/components/Chat/ChatForm";
import { mapGetters } from "vuex";
export default {
  components: {
    ChatMessages,
    ChatForm
  },
  data() {
    return {
      messages: []
    };
  },
  computed: {
    ...mapGetters("AUTH", ["user"])
  },
  created() {
    this.$emit("update:layout", "div");
    this.fetchMessages();
  },

  methods: {
    fetchMessages() {
      let _this_ = this;
      const itemsRef = fire.database().ref("messages");
      itemsRef.on("value", snapshot => {
        let data = snapshot.val();
        let messages = [];
        Object.keys(data).forEach(key => {
          messages.push({
            id: key,
            username: data[key].username,
            text: data[key].text
          });
        });
        _this_.messages = messages;
      });
    },
    addMessage(data) {
      const message = {
        text: data.message,
        username: this.user.name
      };
      fire
        .database()
        .ref("messages")
        .push(message);
      this.showMessage = "";
    }
  }
};
</script>

<style scoped></style>
