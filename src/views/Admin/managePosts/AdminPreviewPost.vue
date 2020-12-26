<template>
  <div class="wrapper">
    <h1 class="title is-1">{{ room.title }}</h1>
    <div class="block">
      Người đăng: <a>{{ room.author }}</a>
    </div>
    <div class="content block">
      <span>Thể loại:</span>&nbsp;<span>{{ room.roomType }}</span>
      <br />
      <span>Địa chỉ:</span>&nbsp;<span>{{ room.detail_address }}</span>
      <br />
      <span>Giá phòng:</span>&nbsp;<span>{{ room.roomPrice }}</span
      >&nbsp;<span>(vnđ)</span> <br />
      <span>Tiền điện:</span>&nbsp;<span>{{ room.electricityPrice }}</span
      >&nbsp;<span>(vnđ/kWh)</span> <br />
      <span>Tiền nước:</span>&nbsp;<span>{{ room.waterPrice }}</span
      >&nbsp;<span>(vnđ/khối)</span> <br />
      <span>Thông tin chi tiết:</span>
      <p>{{ room.detail }}</p>
      <div class="amenities">
        <span>Tiện ích: </span> <br />
        <span>{{
          room.withOwner === 1 ? "Chung chủ" : "Không chung chủ"
        }}</span>
        <p>
          <span>Nhà vệ sinh: </span
          ><span>{{ room.restroom === 1 ? "Khép kín" : "Chung" }}</span>
          <br />
          <span>Nhà bếp: </span
          ><span>{{ room.kitchen === 1 ? "Riêng" : "Chung" }}</span>
          <br />
          <span>Điều hòa: </span
          ><span>{{ room.airConditioner === 1 ? "Có" : "Không" }}</span>
          <br />
          <span>Nóng lạnh: </span
          ><span>{{ room.waterHeater === 1 ? "Có" : "Không" }}</span>
          <br />
          <span>Ban công: </span
          ><span>{{ room.balcony === 1 ? "Có" : "Không" }}</span>
        </p>
        <span>Một số tiện ích khác: </span>
        <span>{{ room.additionalAmenities }}</span>
        <br />
        <span>Gần với </span><span>{{ room.nearPlace }}</span>
      </div>
      <div class="content__images">
        <span>Một số hình ảnh:</span>
        <img
          v-for="(linkImg, index) in room.imgs"
          :key="index"
          :src="baseUrlImg + linkImg"
          alt="Image"
        />
      </div>
    </div>
    <div class="buttons is-centered">
      <button class="button is-success" @click="accept">Chấp nhận</button>
      <button class="button is-danger" @click="confuse">Từ chối</button>
    </div>
  </div>
</template>

<script>
import AdminServices from "../../../apis/modules/admin";
import { getArrayValue } from "@/services/getArrayValue";
import urls from "../../../constants/urls";
import router from "@/router";
export default {
  name: "AdminPreviewPost",
  data() {
    return {
      room: {},
      ownerId: 0
    };
  },
  computed: {
    baseUrlImg: () => urls.BASE_URL_IMG
  },
  created() {
    setTimeout(() => {
      AdminServices.getPostById(this.$route.params.id).then(response => {
        let dataRoom = response.data.data;
        this.ownerId = dataRoom.owner.id;
        this.room = {
          title: dataRoom.title,
          author: dataRoom.owner.name,
          detail_address:
            dataRoom.detail_address +
            " " +
            dataRoom.ward +
            " " +
            dataRoom.district +
            " " +
            dataRoom.province,
          roomType: dataRoom.room_type,
          roomPrice: dataRoom.price,
          electricityPrice: dataRoom.electricity_price,
          waterPrice: dataRoom.water_price,
          detail: dataRoom.info_detail,
          withOwner: dataRoom.with_owner,
          kitchen: dataRoom.kitchen,
          restroom: dataRoom.restroom,
          airConditioner: dataRoom.air_conditioner,
          waterHeater: dataRoom.water_heater,
          balcony: dataRoom.balcony,
          additionalAmenities: getArrayValue(
            dataRoom.additional_amenity,
            "name"
          ).join(", "),
          nearPlace: getArrayValue(dataRoom.near_place, "name").join(", "),
          imgs: getArrayValue(dataRoom.imgs, "link")
        };
      });
    }, 500);
  },
  methods: {
    accept() {
      let dataPack = {
        _method: "PATCH",
        status: 1
      };
      AdminServices.postPreviewPost(this.$route.params.id, dataPack).then(
        () => {
          router.push({ name: "ManagePosts" });
        }
      );
      AdminServices.postSendNotification(this.ownerId, {
        noti: `Bài đăng ${this.room.title} được chấp nhận`
      });
    },
    confuse() {
      let dataPack = {
        _method: "PATCH",
        status: 0
      };
      AdminServices.postPreviewPost(this.$route.params.id, dataPack).then(
        () => {
          router.push({ name: "ManagePosts" });
        }
      );
      AdminServices.postSendNotification(this.ownerId, {
        noti: `Bài đăng ${this.room.title} bị từ chối`
      });
    }
  }
};
</script>

<style scoped></style>
