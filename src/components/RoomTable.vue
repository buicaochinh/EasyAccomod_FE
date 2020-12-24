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
              :class="['tag', item.status === 1 ? 'is-danger' : 'is-success']"
              >{{ item.status === 1 ? "Đã có người thuê" : "Còn phòng" }}</span
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
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
  }
};
</script>
