<template>
  <div class="box">
    <article class="media">
      <div class="media-left">
        <figure class="image is-128x128">
          <router-link :to="{ name: 'Room', params: { id: idRoom } }">
            <img
              src="https://bulma.io/images/placeholders/128x128.png"
              alt="Image"
            />
          </router-link>
        </figure>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <router-link :to="{ name: 'Room', params: { id: 1 } }">
              <strong>John Smith</strong>
            </router-link>
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            efficitur sit amet massa fringilla egestas. Nullam condimentum
            luctus turpis.
          </p>
        </div>
        <div class="field is-grouped">
          <p class="control">
            <b-rate :value="4" show-score disabled />
          </p>
          <p class="control" style="margin-left: auto">
            <button class="button is-small is-danger is-outlined">
              <b-icon size="is-small" icon="heart" />
            </button>
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  props: {
    idRoom: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style scoped>
div.box:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

a {
  color: #2c3e50;
}
</style>
