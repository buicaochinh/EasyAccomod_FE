<template>
  <div class="container">
    <div class="section">
      <div class="columns">
        <div class="column is-one-quarter">
          <div class="img-wrapper">
            <figure class="image is-128x128">
              <img class="is-rounded" src="@/assets/user.png" />
            </figure>
          </div>
          <div class="section">
            <div class="content">
              <p class="name">
                Họ và tên: <strong>{{ user ? user.name : "N/A" }} </strong>
              </p>
              <p class="email">
                Email: <strong>{{ user ? user.email : "N/A" }}</strong>
              </p>
              <p class="phone">
                Số điện thoại:
                <strong>{{ user && user.phone ? user.phone : "N/A" }}</strong>
              </p>
              <p class="address">
                Địa chỉ:
                <strong>{{ user ? user.detail_address : "N/A" }} </strong>
              </p>
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
          <RoomTable
            v-if="user && user.id_role === 3"
            title="Phòng trọ đã đăng"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RoomTable from "../../components/RoomTable";

export default {
  created() {
    this.$store.dispatch("AUTH/getUserData");
  },
  computed: {
    ...mapGetters("AUTH", ["user"])
  },
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
