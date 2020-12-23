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
              <span>Thể loại:</span>&nbsp;<span>{{ room.roomType }}</span>
              <br />
              <span>Địa chỉ:</span>&nbsp;<span>{{ room.detail_address }}</span>
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
              <div class="content__images"></div>
            </div>
            <div class="comment">
              <h5 class="title is-5">Bình luận & Đánh giá</h5>
              <CommentInput />
              <Comment />
            </div>
          </div>
        </div>
        <div class="column">
          Slide
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeServices from "../../apis/modules/home";

import CommentInput from "../../components/CommentInput";
import Comment from "../../components/Comment";
export default {
  data() {
    return {
      room: {}
    };
  },
  components: {
    CommentInput,
    Comment
  },
  created() {
    setTimeout(() => {
      HomeServices.postFilter({
        id_post: this.$route.params.id
      }).then(res => console.log(res.data.data[0]));
      this.room = {
        title: "Cho thuê phòng trọ tại Cầu Giấy",
        author: "Bùi Cao Chinh",
        detail_address: "Số 55 Xuân Thủy Cầu Giấy Hà Hội",
        roomType: "Phòng trọ",
        roomPrice: 3000000,
        electricityPrice: 4000,
        waterPrice: 100000,
        detail: "bla bla",
        imgs: []
      };
    }, 500);
  }
};
</script>

<style scoped>
p {
  text-align: justify;
}
</style>
