<template>
  <div class="container">
    <div class="section">
      <div class="columns">
        <div class="column is-three-quarters">
          <h4 class="title is-4">{{ cateInfo ? cateInfo.name : "" }}</h4>
          <RoomBox
            v-for="(room, index) in rooms"
            :key="index"
            :id-room="room.id"
          />
        </div>
        <div class="column">
          <h5 class="title is-5">Category Name</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeServices from "../../apis/modules/home";
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
  computed: {
    cateInfo() {
      let info = null;
      this.$store.getters["HOME/categories"].forEach(category => {
        if (category.id === this.$route.params.id) {
          info = category;
        }
      });
      return info;
    }
  },
  created() {
    this.$emit("update:layout", "DefaultLayout");
  },
  beforeRouteUpdate(to, from, next) {
    if (to.params.id !== from.params.id) {
      setTimeout(() => {
        HomeServices.postFilter({
          id_room_type: to.params.id
        }).then(response => {
          this.rooms = response.data.data;
        });
      }, 500);
    }
    next();
  }
};
</script>

<style scoped></style>
