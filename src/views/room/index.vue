<template>
  <div class="container">
    <div class="section">
      <div class="columns">
        <div class="column is-three-quarters">
          <div class="section">
            <h1 class="title is-1">{{ room.title }}</h1>
            <div class="block">
              Người đăng: <a>{{ room.author }}</a>
            </div>
            <div class="content block">
              <div class="columns">
                <div class="column is-three-quarters">
                  <span>Thể loại:</span>&nbsp;<span>{{ room.roomType }}</span>
                  <br />
                  <span>Địa chỉ:</span>&nbsp;<span>{{
                    room.detail_address
                  }}</span>
                  <br />
                  <span>Giá phòng:</span>&nbsp;<span>{{ room.roomPrice }}</span
                  >&nbsp;<span>(vnđ)</span> <br />
                  <span>Tiền điện:</span>&nbsp;<span>{{
                    room.electricityPrice
                  }}</span
                  >&nbsp;<span>(vnđ/kWh)</span> <br />
                  <span>Tiền nước:</span>&nbsp;<span>{{ room.waterPrice }}</span
                  >&nbsp;<span>(vnđ/khối)</span> <br />
                  <span>Thông tin chi tiết:</span>
                  <p>{{ room.detail }}</p>
                </div>
                <div class="amenities column">
                  <span>Tiện ích: </span> <br />
                  <span>{{
                    room.withOwner === 1 ? "Chung chủ" : "Không chung chủ"
                  }}</span>
                  <p>
                    <span>Nhà vệ sinh: </span
                    ><span>{{
                      room.restroom === 1 ? "Khép kín" : "Chung"
                    }}</span>
                    <br />
                    <span>Nhà bếp: </span
                    ><span>{{ room.kitchen === 1 ? "Riêng" : "Chung" }}</span>
                    <br />
                    <span>Điều hòa: </span
                    ><span>{{
                      room.airConditioner === 1 ? "Có" : "Không"
                    }}</span>
                    <br />
                    <span>Nóng lạnh: </span
                    ><span>{{ room.waterHeater === 1 ? "Có" : "Không" }}</span>
                    <br />
                    <span>Ban công: </span
                    ><span>{{ room.balcony === 1 ? "Có" : "Không" }}</span>
                  </p>
                </div>
              </div>
              <div>
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
            <div class="report">
              <div class="block">
                <button class="button is-info" @click="isActive = !isActive">
                  Báo cáo
                </button>
              </div>
              <div class="is-relative">
                <b-notification
                  v-model="isActive"
                  aria-close-label="Close notification"
                >
                  <div class="block">
                    <b-radio
                      v-model="reportContent"
                      native-value="Nội dung không phù hợp"
                    >
                      Nội dung không phù hợp
                    </b-radio>
                  </div>
                  <div class="block">
                    <b-radio
                      v-model="reportContent"
                      native-value="Trang này không uy tín"
                    >
                      Trang này không uy tín
                    </b-radio>
                  </div>

                  <div class="block">
                    <b-radio
                      v-model="reportContent"
                      native-value="Phòng không tương đương với giá"
                    >
                      Phòng không phù hợp với giá
                    </b-radio>
                  </div>
                  <div class="block">
                    <button class="button is-info" @click="sendReport">
                      Gửi
                    </button>
                  </div>
                </b-notification>
              </div>
            </div>

            <div class="comment">
              <h5 class="title is-5">Bình luận & Đánh giá</h5>
              <div class="comments">
                <Comment
                  v-for="(comment, index) in comments"
                  :content="comment.content"
                  :rate="comment.rate"
                  :username="'Bùi Cao Chinh'"
                  :key="index"
                />
              </div>
              <CommentInput :id-room="this.$route.params.id" />
            </div>
          </div>
        </div>
        <div class="column banner-slide"></div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeServices from "../../apis/modules/home";
import { getArrayValue } from "@/services/getArrayValue";
import urls from "@/constants/urls";

import CommentInput from "../../components/CommentInput";
import Comment from "../../components/Comment";

export default {
  data() {
    return {
      room: {},
      comments: [],
      isActive: false,
      reportContent: ""
    };
  },
  components: {
    CommentInput,
    Comment
  },
  computed: {
    baseUrlImg: () => urls.BASE_URL_IMG
  },
  created() {
    setTimeout(() => {
      HomeServices.getAPost(this.$route.params.id).then(response => {
        let dataRoom = response.data.post;
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
      HomeServices.getComments(this.$route.params.id).then(response => {
        this.comments = response.data.cmt;
        console.log(this.comments);
      });
    }, 500);
  },
  methods: {
    sendReport() {
      HomeServices.postReport(this.$route.params.id, {
        req: this.reportContent
      }).then(() => {
        alert("Report thành công");
      });
    }
  }
};
</script>

<style scoped>
a {
  color: cornflowerblue;
}

.comment .comments {
  margin-top: 5rem;
}

.banner-slide {
  background: url("../../assets/slide.jpg") no-repeat 0 80px;
}
</style>
