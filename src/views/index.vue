<template>
  <div>
    <Banner />
    <div class="container">
      <div class="columns">
        <div class="column is-one-quarter">
          <Search />
        </div>
        <div class="column">
          <div class="section">
            <h3 class="title is-3">Phòng trọ nổi bật</h3>
            <div class="columns is-multiline">
              <div
                class="column is-one-third"
                v-for="(item, index) in nineOnTop"
                :key="index"
              >
                <RoomCard
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
            </div>
          </div>
          <div class="section">
            <h3 class="title is-3">Phòng trọ mới nhất</h3>
            <div class="columns is-multiline">
              <div
                class="column is-one-third"
                v-for="(item, index) in sixLastest"
                :key="index"
              >
                <RoomCard
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "../components/Search";
import RoomCard from "../components/RoomCard";
import Banner from "../components/Banner";

import HomeServices from "../apis/modules/home";

export default {
  components: {
    Banner,
    Search,
    RoomCard
  },
  data() {
    return {
      nineOnTop: [],
      sixLastest: []
    };
  },
  async created() {
    this.$emit("update:layout", "DefaultLayout");
    await this.$store.dispatch("HOME/getFavorites");
    const response = await HomeServices.getRoom();
    this.nineOnTop = response.data.nine_posts_on_top;
    this.sixLastest = response.data.six_posts_lastest;
  }
};
</script>

<style scoped>
h3.title {
  padding-bottom: 1rem;
  border-bottom: 1px solid #ddd;
}
</style>
