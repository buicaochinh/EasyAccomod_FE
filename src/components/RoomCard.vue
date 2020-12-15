<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by3">
        <router-link :to="{ name: 'Room', params: { slug: 'Title' } }">
          <img
            src="https://bulma.io/images/placeholders/1280x960.png"
            alt="Placeholder image"
          />
        </router-link>
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-5">
            <router-link
              style="color: #2c3e50"
              :to="{ name: 'Room', params: { slug: 'Title' } }"
              >Title</router-link
            >
          </p>
        </div>
      </div>

      <div class="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
        iaculis mauris.
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
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
div.card:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
