<template>
  <div class="container">
    <div class="section">
      <div class="columns">
        <div class="column is-one-quarter">
          <div class="img-wrapper">
            <figure class="image is-128x128">
              <img
                class="is-rounded"
                src="https://bulma.io/images/placeholders/128x128.png"
              />
            </figure>
          </div>
          <div class="section">
            <div class="content">
              <p class="name">Họ và tên: <strong>Bùi Cao Chinh</strong></p>
              <p class="email">Email: <strong>123456@gmail.com</strong></p>
              <p class="phone">Số điện thoại: <strong>N/A</strong></p>
            </div>
            <div class="buttons">
              <router-link
                :to="{ name: 'ChangeInformation' }"
                class="button is-info is-fullwidth"
                >Chỉnh sửa thông tin</router-link
              >
              <router-link
                :to="{ name: 'ChangePassword' }"
                class="button is-light is-fullwidth"
                >Thay đổi mật khẩu</router-link
              >
            </div>
          </div>
        </div>
        <div class="column">
          <RoomTable title="Phòng trọ ưa thích" />
          <RoomTable title="Phòng trọ đã đăng" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import RoomTable from "../../components/RoomTable";

export default {
  // created() {
  //   this.$store.dispatch("AUTH/getUserData").catch();
  // },
  // computed: {
  //   ...mapGetters("AUTH", ["user"])
  // }
  components: {
    RoomTable
  }
};
</script>

<style scoped>
div.img-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
