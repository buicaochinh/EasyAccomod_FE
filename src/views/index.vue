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
              <div class="column is-one-quarter">
                <RoomCard />
              </div>
              <div class="column is-one-quarter">
                <RoomCard />
              </div>
              <div class="column is-one-quarter">
                <RoomCard />
              </div>
              <div class="column is-one-quarter">
                <RoomCard />
              </div>
            </div>
          </div>
          <div class="section">
            <h3 class="title is-3">Phòng trọ giá tốt</h3>
            <div class="columns is-multiline">
              <div class="column is-one-quarter">
                <RoomCard />
              </div>
              <div class="column is-one-quarter">
                <RoomCard />
              </div>
              <div class="column is-one-quarter">
                <RoomCard />
              </div>
              <div class="column is-one-quarter">
                <RoomCard />
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
      noiBat: [],
      giaTot: []
    };
  },
  async created() {
    const response = await HomeServices.getRoom();
    this.noiBat = response.data.nine_post_on_top;
    this.giaTot = response.data.six_post_lastest;
    this.$emit("update:layout", "DefaultLayout");
  }
};
</script>

<style scoped>
h3.title {
  padding-bottom: 1rem;
  border-bottom: 1px solid #ddd;
}
</style>
