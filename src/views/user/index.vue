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
                v-if="
                  $store.getters['AUTH/user'] &&
                    ($store.getters['AUTH/user'].id_role === 2 ||
                      $store.getters['AUTH/user'].id_role === 3)
                "
                :to="{ name: 'Chat' }"
                class="button is-danger is-fullwidth"
                >Chat</router-link
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
          <div class="favorite-table">
            <RoomTable
              title="Phòng trọ ưa thích"
              :is-fav="true"
              :rooms-data="favorites"
              @switchRented="switchRented($event)"
            />
          </div>
          <div class="posted-table">
            <RoomTable
              v-if="user && (user.id_role === 3 || user.id_role === 2)"
              title="Phòng trọ đã đăng"
              :rooms-data="postsPosted"
              :is-fav="false"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import HomeServices from "../../apis/modules/home";

import RoomTable from "../../components/RoomTable";

export default {
  created() {
    this.$store.dispatch("AUTH/getUserData");
    this.$store.dispatch("HOME/getFavorites");
    setTimeout(() => {
      HomeServices.getPostPosted().then(response => {
        this.postsPosted = response.data.post_posted;
      });
    }, 500);
  },
  data() {
    return {
      postsPosted: []
    };
  },
  computed: {
    ...mapGetters("AUTH", ["user"]),
    ...mapGetters("HOME", ["favorites"])
  },
  components: {
    RoomTable
  },
  methods: {
    switchRented(index) {
      let temp = this.postsPosted;
      this.postsPosted = [
        ...temp.slice(0, index),
        {
          ...temp[index],
          is_rented: temp[index].is_rented === 1 ? 0 : 1
        },
        ...temp.slice(index + 1)
      ];
    }
  }
};
</script>

<style scoped>
div.img-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

div.posted-table {
  margin-top: 3rem;
}
</style>
