<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-64x64">
        <img src="@/assets/user.png" />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{{ $props.username }}</strong
          ><b-rate :value="rate" show-score disabled />
          {{ $props.content }}
        </p>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: ""
    },
    rate: {
      type: Number,
      default: 0
    },
    username: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped></style>
