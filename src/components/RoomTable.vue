<template>
  <div class="wrapper">
    <h5 class="title is-5">{{ $props.title }}</h5>
    <table class="table is-fullwidth is-hoverable">
      <thead>
        <tr>
          <th>Tiêu đề</th>
          <th>Danh mục</th>
          <th v-if="!$props.isFav">Kiểm duyệt</th>
          <th>Tình trạng</th>
          <th v-if="!$props.isFav"></th>
          <th v-if="!$props.isFav"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in $props.roomsData" :key="index">
          <td v-if="item.status === 1">
            <router-link :to="{ name: 'Room', params: { id: item.id } }">{{
              item.title
            }}</router-link>
          </td>
          <td v-else>{{ item.title }}</td>
          <td>{{ item.room_type }}</td>
          <td v-if="!$props.isFav">
            <span
              :class="['tag', item.status === 1 ? 'is-success' : 'is-warning']"
              >{{
                item.status === 1
                  ? "Đã được kiểm duyệt"
                  : "Chưa được kiểm duyệt"
              }}</span
            >
          </td>
          <td>
            <span
              :class="[
                'tag',
                item.is_rented === 1 ? 'is-danger' : 'is-success'
              ]"
              >{{
                item.is_rented === 1 ? "Đã có người thuê" : "Còn phòng"
              }}</span
            >
          </td>
          <td v-if="!$props.isFav">
            <button
              class="button is-info is-small"
              @click="editPost(item)"
              :disabled="item.status === 0"
            >
              Chỉnh sửa
            </button>
          </td>
          <td v-if="!$props.isFav">
            <button
              class="button is-primary is-small"
              @click="switchRented(item, index)"
            >
              Cập nhật tình trạng
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import router from "@/router";
import HomeServices from "@/apis/modules/home";
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    roomsData: {
      type: Array
    },
    isFav: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    editPost(item) {
      this.$store.dispatch("HOME/setCurrentPost", item);
      router.push({ name: "EditPost", params: { id: item.id } });
    },
    switchRented(item, index) {
      HomeServices.postRented(item.id, {
        rented: item.is_rented === 1 ? 0 : 1
      });
      this.$emit("switchRented", index);
    }
  }
};
</script>
