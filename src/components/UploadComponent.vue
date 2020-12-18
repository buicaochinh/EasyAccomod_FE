<template>
  <section>
    <b-field class="file">
      <b-upload v-model="file" type="is-info" expanded>
        <a class="button is-primary is-fullwidth">
          <b-icon icon="upload"></b-icon>
          <span>{{ file.name || "Nhấp để tải lên" }}</span>
        </a>
      </b-upload>
    </b-field>
    <b-field>
      <b-upload v-model="dropFiles" type="is-info" multiple drag-drop expanded>
        <section class="section">
          <div class="content has-text-centered">
            <p>
              <b-icon icon="upload" size="is-large"></b-icon>
            </p>
            <p>Kéo thả hoặc click để tải lên</p>
          </div>
        </section>
      </b-upload>
    </b-field>

    <div class="tags">
      <span
        v-for="(file, index) in dropFiles"
        :key="index"
        class="tag is-primary"
      >
        {{ file.name }}
        <button
          class="delete is-small"
          type="button"
          @click="deleteDropFile(index)"
        ></button>
      </span>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      file: {},
      dropFiles: []
    };
  },
  methods: {
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1);
    }
  }
};
</script>
