<template>
  <div class="container">
    <div class="section">
      <div class="columns">
        <div class="column is-three-quarters">
          <div class="section">
            <h1 class="title is-1">{{ title }}</h1>
            <div class="content__images">
              <b-carousel :indicator-inside="false">
                <b-carousel-item v-for="(item, index) in imgs" :key="index">
                  <span class="image">
                    <img :src="baseUrlImg + item" alt="Image" />
                  </span>
                </b-carousel-item>
              </b-carousel>
            </div>
            <div class="content block">
              <div class="author">
                <strong>Người đăng: </strong><a href=""> {{ author }} </a>
              </div>
              <div class="columns">
                <div class="column">
                  <div class="line">
                    <span><strong>Thể loại:</strong></span
                    >&nbsp;<span>{{ roomType }}</span>
                    <br />
                  </div>
                  <div class="line">
                    <span><strong>Địa chỉ:</strong></span
                    >&nbsp;<span>{{ detailAddress }}</span>
                    <br />
                  </div>
                  <div class="line">
                    <span><strong>Giá phòng:</strong></span
                    >&nbsp;<span>{{ roomPrice | toCurrency }}</span
                    >&nbsp;<span></span> <br />
                  </div>
                  <div class="line">
                    <span><strong>Diện tích:</strong></span
                    >&nbsp;<span>{{ square }} m<sup>2</sup></span
                    >&nbsp;<span></span> <br />
                  </div>
                  <div class="line">
                    <span><strong>Tiền điện:</strong></span
                    >&nbsp;<span>{{ electricityPrice | toCurrency }}</span
                    >&nbsp;<span></span> <br />
                  </div>
                  <div class="line">
                    <span><strong>Tiền nước:</strong></span
                    >&nbsp;<span>{{ waterPrice | toCurrency }}</span
                    >&nbsp;<span></span> <br />
                  </div>
                  <div class="line">
                    <span><strong>Thông tin chi tiết:</strong></span>
                    <p>{{ detail }}</p>
                  </div>
                  <div class="line">
                    <span><strong>Tiện ích: </strong></span> <br />
                    <table>
                      <tr>
                        <td>
                          <span><strong>Chung chủ: </strong></span
                          ><span>{{ withOwner === 1 ? "Có" : "Không" }}</span>
                        </td>
                        <td>
                          <span><strong>Nhà vệ sinh: </strong></span
                          ><span>{{
                            restroom === 1 ? "Khép kín" : "Chung"
                          }}</span>
                        </td>
                        <td>
                          <span><strong>Nhà bếp: </strong></span
                          ><span>{{ kitchen === 1 ? "Riêng" : "Chung" }}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span><strong>Điều hòa: </strong></span
                          ><span>{{
                            airConditioner === 1 ? "Có" : "Không"
                          }}</span>
                        </td>
                        <td>
                          <span><strong>Nóng lạnh: </strong></span
                          ><span>{{ waterHeater === 1 ? "Có" : "Không" }}</span>
                        </td>
                        <td>
                          <span><strong>Ban công: </strong></span
                          ><span>{{ balcony === 1 ? "Có" : "Không" }}</span>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div class="line">
                    <span><strong>Một số tiện ích khác: </strong></span>
                    <span>{{ additionalAmenities }}</span>
                    <br />
                  </div>
                  <div class="line">
                    <span><strong>Địa điểm lớn gần đó: </strong></span
                    ><span>{{ nearPlace }}</span>
                  </div>
                </div>
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
                  :username="user ? user.name : ''"
                  :key="index"
                />
              </div>
              <CommentInput :id-room="parseInt($route.params.id)" />
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
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      title: "",
      author: "",
      detailAddress: "",
      roomType: "",
      roomPrice: 0,
      electricityPrice: 0,
      waterPrice: 0,
      square: 0,
      detail: "",
      withOwner: 0,
      kitchen: 0,
      restroom: 0,
      airConditioner: 0,
      waterHeater: 0,
      balcony: 0,
      additionalAmenities: [],
      nearPlace: [],
      comments: [],
      imgs: [],
      isActive: false,
      reportContent: ""
    };
  },
  components: {
    CommentInput,
    Comment
  },
  computed: {
    ...mapGetters("AUTH", ["user"]),
    baseUrlImg: () => urls.BASE_URL_IMG
  },
  created() {
    setTimeout(() => {
      HomeServices.getAPost(parseInt(this.$route.params.id)).then(response => {
        console.log(response.data.post);
        this.title = response.data.post.title;
        this.author = response.data.post.owner.name;
        this.detailAddress =
          response.data.post.detail_address +
          " " +
          response.data.post.ward +
          " " +
          response.data.post.district +
          " " +
          response.data.post.province;
        this.roomType = response.data.post.room_type;
        this.roomPrice = response.data.post.price;
        this.electricityPrice = response.data.post.electricity_price;
        this.square = response.data.post.square;
        this.waterPrice = response.data.post.water_price;
        this.detail = response.data.post.info_detail;
        this.withOwner = response.data.post.with_owner;
        this.kitchen = response.data.post.kitchen;
        this.restroom = response.data.post.restroom;
        this.airConditioner = response.data.post.air_conditioner;
        this.waterHeater = response.data.post.water_heater;
        this.balcony = response.data.post.balcony;
        this.additionalAmenities = getArrayValue(
          response.data.post.additional_amenity,
          "name"
        ).join(", ");
        this.nearPlace = getArrayValue(
          response.data.post.near_place,
          "name"
        ).join(", ");
        this.imgs = getArrayValue(response.data.post.imgs, "link");
      });
      HomeServices.getComments(this.$route.params.id).then(response => {
        this.comments = response.data.cmt;
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
.line {
  margin-top: 0.75rem;
}
</style>
