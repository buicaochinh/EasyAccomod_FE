<template>
  <div class="container">
    <div class="section">
      <h4 class="title is-4">Kết quả được lọc:</h4>
      <div class="mb-5" v-for="(item, index) in roomsPagination" :key="index">
        <RoomBox
          :title="item.title"
          :id-room="item.id"
          :img-src="item.imgs[0].link"
          :price="item.price"
          :area="item.square"
          :address="item.detail_address"
          :category="item.room_type"
          :rate="item.rate"
        />
      </div>
      <div v-if="noData" class="notification is-danger">
        Không tìm thấy kết quả nào!
      </div>
      <b-pagination
        type="is-info"
        :total="roomsFilter.length"
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
  </div>
</template>

<script>
import HomeServices from "../../apis/modules/home.js";
import RoomBox from "../../components/RoomBox";
import { pagination } from "@/services/pagination";

export default {
  components: {
    RoomBox
  },
  data() {
    return {
      roomsFilter: [],
      current: 1,
      noData: false
    };
  },
  computed: {
    roomsPagination() {
      let page = this.current;
      return [...pagination(this.roomsFilter, page)];
    }
  },
  mounted() {
    this.$emit("update:layout", "DefaultLayout");
    let dataPack = this.$store.getters["HOME/searchData"];
    setTimeout(() => {
      HomeServices.postFilter(dataPack).then(response => {
        this.roomsFilter = response.data.data;
        if (this.roomsFilter.length === 0) {
          this.noData = true;
        }
      });
    }, 500);
  }
};
</script>

<style scoped></style>
