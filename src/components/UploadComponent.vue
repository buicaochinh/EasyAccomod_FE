<template>
  <section>
    <b-field label="Hình ảnh">
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
      dropFiles: []
    };
  },
  watch: {
    dropFiles(val) {
      this.$emit("addFiles", val);
      return val;
    }
  },
  methods: {
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1);
    }
  }
};
</script>
