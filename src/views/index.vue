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
export default {
  components: {
    Banner,
    Search,
    RoomCard
  },
  created() {
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
