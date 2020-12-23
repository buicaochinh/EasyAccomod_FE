<template>
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
            <a class="button is-info">Bình luận</a>
          </div>
        </div>
      </nav>
    </div>
  </article>
</template>

<script>
export default {
  data() {
    return {
      rate: 0,
      commentContent: ""
    };
  }
};
</script>

<style scoped></style>
