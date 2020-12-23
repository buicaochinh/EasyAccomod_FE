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
                class="column is-one-quarter"
                v-for="(item, index) in eightOnTop"
                :key="index"
              >
                <RoomCard
                  :title="item.title"
                  :id-room="item.id"
                  :img-src="item.imgs[0].link"
                  :price="item.price"
                  :area="item.square"
                  :address="item.detail_address"
                  :category="
                    $store.getters['HOME/categories'].find(
                      category => category.id === item.id_room_type
                    )
                  "
                />
              </div>
            </div>
          </div>
          <div class="section">
            <h3 class="title is-3">Phòng trọ giá tốt</h3>
            <div class="columns is-multiline">
              <div
                class="column is-one-quarter"
                v-for="(item, index) in eightLastest"
                :key="index"
              >
                <RoomCard
                  :title="item.title"
                  :id-room="item.id"
                  :img-src="item.imgs[0].link"
                  :price="item.price"
                  :area="item.square"
                  :address="item.detail_address"
                  :category="searchCategory(item.id_room_type)"
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
      eightOnTop: [],
      eightLastest: []
    };
  },
  async created() {
    this.$emit("update:layout", "DefaultLayout");
    const response = await HomeServices.getRoom();
    this.eightOnTop = response.data.eight_post_on_top;
    this.eightLastest = response.data.eight_post_lastest;
  },
  methods: {
    searchCategory(id) {
      let category = this.$store.getters["HOME/categories"].find(
        category => category.id === id
      );
      return category;
    }
  }
};
</script>

<style scoped>
h3.title {
  padding-bottom: 1rem;
  border-bottom: 1px solid #ddd;
}
</style>
