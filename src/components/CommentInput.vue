<template>
  <div class="wrapper">
    <div v-if="message !== ''" class="mes notification is-warning is-light">
      {{ message }}
    </div>
    <article class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <img alt="Ảnh đại diện" src="../assets/user.png" />
        </p>
      </figure>
      <div class="media-content">
        <div class="field is-grouped">
          <p class="control">
            <span>Đánh giá:</span>
            <b-rate class="block" v-model="rate" :value="rate" show-score />
          </p>
        </div>
        <div class="field">
          <p class="control">
            Bình luận:
            <textarea
              aria-label="Bình luận"
              class="textarea"
              v-model="commentContent"
              placeholder="Nhập bình luận ... "
            ></textarea>
          </p>
        </div>
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <button class="button is-info" @click="submit">Bình luận</button>
            </div>
          </div>
        </nav>
      </div>
    </article>
  </div>
</template>

<script>
import HomeServices from "../apis/modules/home";
import { mapGetters } from "vuex";
export default {
  props: {
    idRoom: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      rate: 0,
      commentContent: "",
      message: ""
    };
  },
  computed: {
    ...mapGetters("AUTH", ["user"])
  },
  methods: {
    submit() {
      let dataPack = {
        rate: this.rate,
        cmt: this.commentContent
      };
      this.$emit("comments", {
        rate: this.rate,
        content: this.commentContent,
        username: this.user.name
      });
      HomeServices.postComment(this.$props.idRoom, dataPack).then(response => {
        this.message = response.data.data;
      });
    }
  }
};
</script>

<style scoped>
.wrapper {
  margin-top: 2rem;
}
</style>
