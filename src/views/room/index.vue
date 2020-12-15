<template>
  <div class="container">
    <div class="section">
      <div class="columns">
        <div class="column is-three-quarters">
          <div class="section">
            <h1 class="title is-1">{{ room.title }}</h1>
            <a>{{ room.author }}</a> <br />
            <p>{{ room.content }}</p>
          </div>
        </div>
        <div class="column">
          Slice
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      room: ""
    };
  },
  created() {
    setTimeout(() => {
      this.room = {
        title: "Cho thuê phòng trọ tại Cầu Giấy",
        author: "Bùi Cao Chinh",
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. " +
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, " +
          "when an unknown printer took a galley of type and scrambled it to make a type specimen book." +
          "It has survived not only five centuries, but also the leap into electronic typesetting, " +
          "remaining essentially unchanged. " +
          "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, " +
          "and more recently with desktop publishing software like Aldus PageMaker " +
          "including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. " +
          "Lorem Ipsum has been the industry's standard " +
          "dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled " +
          "it to make a type specimen book. It has survived not only five centuries, " +
          "but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised " +
          "in the 1960s with the release of Letraset sheets containing " +
          "Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including " +
          "versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the " +
          "printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever " +
          "since the 1500s, when an unknown printer took a galley of type and scrambled it " +
          "to make a type specimen book. It has survived not only five centuries, but also the leap into electronic " +
          "typesetting, remaining essentially unchanged. It was popularised in " +
          "the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with " +
          "desktop publishing software like Aldus PageMaker including versions of " +
          "Lorem Ipsum."
      };
    }, 500);
  }
};
</script>

<style scoped>
p {
  text-align: justify;
}
</style>
