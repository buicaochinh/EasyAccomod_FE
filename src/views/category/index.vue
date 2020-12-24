<template>
  <div class="container">
    <div class="section">
      <div class="columns">
        <div class="column is-three-quarters">
          <h4 class="title is-4">{{ cateInfo ? cateInfo.name : "" }}</h4>
          <div
            class="mb-5"
            v-for="(item, index) in roomsPagination"
            :key="index"
          >
            <RoomBox
              :title="item.title"
              :id-room="item.id"
              :img-src="item.imgs[0].link"
              :price="item.price"
              :area="item.square"
              :address="item.detail_address"
              :category="item.room_type"
            />
          </div>
          <b-pagination
            type="is-info"
            :total="rooms.length"
            v-model="current"
            :range-before="2"
            :range-after="2"
            order="is-centered"
            side="default"
            :simple="false"
            :rounded="false"
            :per-page="10"
            icon-prev="chevron-left"
            icon-next="chevron-right"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page"
          >
          </b-pagination>
        </div>
        <div class="column">
          <h5 class="title is-5">Slide</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeServices from "../../apis/modules/home";
import { pagination } from "@/services/pagination";

import RoomBox from "../../components/RoomBox";
export default {
  components: {
    RoomBox
  },
  data() {
    return {
      rooms: [],
      current: 1
    };
  },
  computed: {
    roomsPagination() {
      let page = this.current;
      return [...pagination(this.rooms, page)];
    },
    cateInfo() {
      return this.$store.getters["HOME/categories"].find(
        item => item.id === this.$route.params.id
      );
    }
  },
  watch: {
    current(val) {
      return val;
    }
  },
  created() {
    this.$emit("update:layout", "DefaultLayout");
    setTimeout(() => {
      HomeServices.postFilter({
        id_room_type: this.$route.params.id
      }).then(response => {
        this.rooms = response.data.data;
      });
    }, 500);
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
