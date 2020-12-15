<template>
  <div class="container">
    <div class="section">
      <div class="columns">
        <div class="column is-three-quarters">
          <h4 class="title is-4">Category Name</h4>
          <RoomBox />
          <RoomBox />
          <RoomBox />
          <RoomBox />
          <RoomBox />
        </div>
        <div class="column">
          <h5 class="title is-5">Category Name</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RoomBox from "../../components/RoomBox";
export default {
  components: {
    RoomBox
  },
  data() {
    return {
      rooms: []
    };
  },
  created() {
    this.$emit("update:layout", "DefaultLayout");
  }
};
</script>

<style scoped></style>
