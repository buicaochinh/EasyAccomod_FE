<template>
  <div class="wrapper">
    <h3 class="title is-3">Thống kê</h3>
    <div class="columns">
      <div class="total-user column is-4">
        <h5 class="title is-5">
          Tổng số người dùng:
        </h5>
        <div class="user-count">{{ totalUsers }}</div>
      </div>
      <div class="views-of-month column is-9">
        <h5 class="title is-5">Phòng được xem nhiều nhất trong tháng:</h5>
        <div class="title is-5">{{ theMostViewsPost.title }}</div>
        <div class="content">
          <p class="author">
            Người đăng:
            {{ theMostViewsPost.owner ? theMostViewsPost.owner.name : "N/A" }}
          </p>
          <p class="category">Danh mục: {{ theMostViewsPost.room_type }}</p>
          <p class="address">
            Địa chỉ:
            {{
              theMostViewsPost.detail_address +
                " " +
                theMostViewsPost.ward +
                " " +
                theMostViewsPost.district +
                " " +
                theMostViewsPost.province
            }}
          </p>
          <p class="views-count">
            Tổng số lượt xem: {{ theMostViewsPost.views }}
          </p>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <Panel
          title="Top 10 Quận/Huyện"
          :data="topTenDistricts"
          id-key="id_district"
        />
      </div>
      <div class="column">
        <Panel title="Top 10 Phường/Xã" :data="topTenWards" id-key="id_ward" />
      </div>
    </div>
  </div>
</template>

<script>
import AdminServices from "../../apis/modules/admin";

import Panel from "@/components/Admin/Panel";
export default {
  components: {
    Panel
  },
  data() {
    return {
      totalUsers: 0,
      theMostViewsPost: {},
      topTenDistricts: [],
      topTenWards: []
    };
  },
  created() {
    this.$emit("update:layout", "AdminLayout");
    setTimeout(() => {
      AdminServices.getStatistic().then(response => {
        this.totalUsers = response.data.total_users;
        this.theMostViewsPost = response.data.most_views_in_month;
        this.topTenDistricts = response.data.top_10_districts_in_month;
        this.topTenWards = response.data.top_10_wards_in_month;
      });
    }, 500);
  }
};
</script>

<style scoped>
.user-count {
  font-weight: bold;
  font-size: 6rem;
}
</style>
