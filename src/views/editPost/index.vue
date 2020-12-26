<template>
  <div class="container">
    <div class="section">
      <h3 class="title is-3">Đăng tin cho thuê phòng</h3>
      <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
        <ValidationProvider rules="required" name="Title" v-slot="{ errors }">
          <b-field
            label="Tiêu đề bài viết: "
            :type="{ 'is-danger': errors[0] }"
            :message="errors"
          >
            <b-input type="text" v-model="title"></b-input>
          </b-field>
        </ValidationProvider>
        <ValidationProvider
          rules="required"
          name="DetailAddress"
          v-slot="{ errors }"
        >
          <b-field
            label="Địa chỉ phòng trọ: "
            :type="{ 'is-danger': errors[0] }"
            :message="errors"
          >
            <b-input type="text" v-model="detailAddress"></b-input>
          </b-field>
        </ValidationProvider>
        <div class="columns">
          <ValidationProvider
            rules="required"
            name="Category"
            v-slot="{ errors }"
            class="column"
          >
            <b-field
              label="Danh mục: "
              :type="{ 'is-danger': errors[0], 'is-info': true }"
              :message="errors"
            >
              <b-select
                placeholder="Danh mục"
                v-model="categorySelected"
                expanded
              >
                <option
                  v-for="(category, index) in categories"
                  :key="index"
                  :value="category.id"
                  >{{ category.name }}</option
                >
              </b-select>
            </b-field>
          </ValidationProvider>
          <ValidationProvider
            class="column"
            rules="required"
            name="Price"
            v-slot="{ errors }"
          >
            <b-field
              label="Giá phòng(VNĐ): "
              :type="{ 'is-danger': errors[0] }"
              :message="errors"
            >
              <b-input type="number" v-model="price"></b-input>
            </b-field>
          </ValidationProvider>
          <ValidationProvider
            class="column"
            rules="required"
            name="Price"
            v-slot="{ errors }"
          >
            <b-field
              label="Giá điện(VNĐ/kWh): "
              :type="{ 'is-danger': errors[0] }"
              :message="errors"
            >
              <b-input type="number" v-model="electricityPrice"></b-input>
            </b-field>
          </ValidationProvider>
          <ValidationProvider
            class="column"
            rules="required"
            name="Price"
            v-slot="{ errors }"
          >
            <b-field
              label="Giá nước(VNĐ/Khối): "
              :type="{ 'is-danger': errors[0] }"
              :message="errors"
            >
              <b-input type="number" v-model="waterPrice"></b-input>
            </b-field>
          </ValidationProvider>
          <ValidationProvider
            class="column"
            rules="required"
            name="Area"
            v-slot="{ errors }"
          >
            <b-field
              label="Diện tích(m2): "
              :type="{ 'is-danger': errors[0] }"
              :message="errors"
            >
              <b-input type="number" v-model="area"></b-input>
            </b-field>
          </ValidationProvider>
          <ValidationProvider
            class="column"
            rules="required"
            name="TimeToLive"
            v-slot="{ errors }"
          >
            <b-field
              label="Thời gian hiển thị(tuần): "
              :type="{ 'is-danger': errors[0] }"
              :message="errors"
            >
              <b-input type="number" v-model="timeToLive"></b-input>
            </b-field>
          </ValidationProvider>
        </div>

        <SelectAddress @wardSelect="idWard = $event" />

        <ValidationProvider
          rules="required"
          name="Description"
          v-slot="{ errors }"
        >
          <b-field
            label="Tiện ích"
            :type="{ 'is-danger': errors[0] }"
            :message="errors"
          >
            <div class="checkbox">
              <b-checkbox
                type="is-info"
                native-value="with_owner"
                v-model="amenities"
              >
                Chung chủ
              </b-checkbox>
              <b-checkbox
                type="is-info"
                native-value="restroom"
                v-model="amenities"
              >
                Nhà vệ sinh
              </b-checkbox>
              <b-checkbox
                type="is-info"
                native-value="kitchen"
                v-model="amenities"
              >
                Nhà bếp
              </b-checkbox>
              <b-checkbox
                type="is-info"
                native-value="water_heater"
                v-model="amenities"
              >
                Nóng lạnh
              </b-checkbox>
              <b-checkbox
                type="is-info"
                native-value="air_conditioner"
                v-model="amenities"
              >
                Điều hòa
              </b-checkbox>
              <b-checkbox
                type="is-info"
                native-value="balcony"
                v-model="amenities"
              >
                Ban công
              </b-checkbox>
            </div>
          </b-field>
        </ValidationProvider>
        <b-field label="Tiện ích khác" type="is-info">
          <div class="field">
            <b-taginput
              type="is-info"
              v-model="additionalAmenities"
            ></b-taginput>
          </div>
        </b-field>
        <b-field label="Khu vực" type="is-info">
          <div class="field">
            <b-taginput type="is-info" v-model="nearPlace"></b-taginput>
          </div>
        </b-field>
        <ValidationProvider
          rules="required"
          name="Description"
          v-slot="{ errors }"
        >
          <b-field
            label="Thông tin chi tiết: "
            :type="{ 'is-danger': errors[0], 'is-info': true }"
            :message="errors"
          >
            <b-input type="textarea" v-model="description"></b-input>
          </b-field>
        </ValidationProvider>
        <UploadComponent @addFiles="imgs = [...$event]" />
        <div v-if="active" class="notification is-warning is-light">
          {{ message }}
        </div>
        <div class="buttons is-centered mt-5">
          <button class="button is-info" @click="handleSubmit(submit)">
            <span>Chỉnh sửa</span>
          </button>
          <router-link class="button is-danger" :to="{ name: 'User' }">
            <span>Quay lại</span>
          </router-link>
        </div>
      </ValidationObserver>
    </div>
    {{ title }}
  </div>
</template>

<script>
import SelectAddress from "../../components/SelectAddress";
import UploadComponent from "../../components/UploadComponent";

import HomeServices from "../../apis/modules/home";

import { ValidationObserver, ValidationProvider } from "vee-validate";
import { getArrayValue } from "@/services/getArrayValue";
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    SelectAddress,
    UploadComponent
  },
  data() {
    return {
      title: "",
      detailAddress: "",
      price: 0,
      area: 0,
      categorySelected: -1,
      categories: [],
      timeToLive: 0,
      description: "",
      idWard: -1,
      electricityPrice: 0,
      waterPrice: 0,
      amenities: [],
      additionalAmenities: [],
      nearPlace: [],
      imgs: [],
      message: "",
      active: false
    };
  },
  created() {
    const _this = this;
    setTimeout(() => {
      HomeServices.getCategory().then(response => {
        this.categories = response.data.room_types;
      });
    }, 500);
    let payload = this.$store.getters["HOME/nearestPost"];
    _this.title = payload.title;
    _this.detailAddress = payload.detail_address;
    _this.price = payload.price;
    _this.area = payload.square;
    _this.categorySelected = payload.id_room_type;
    _this.description = payload.info_detail;
    _this.idWard = payload.id_ward;
    _this.electricityPrice = payload.electricity_price;
    _this.waterPrice = payload.water_price;
    if (payload.with_owner === 1) {
      _this.amenities.push("with_owner");
    }
    if (payload.restroom === 1) {
      _this.amenities.push("restroom");
    }
    if (payload.kitchen === 1) {
      _this.amenities.push("kitchen");
    }
    if (payload.water_heater === 1) {
      _this.amenities.push("water_heater");
    }
    if (payload.air_conditioner === 1) {
      _this.amenities.push("air_conditioner");
    }
    if (payload.balcony === 1) {
      _this.amenities.push("balcony");
    }
    _this.additionalAmenities = getArrayValue(
      payload.additional_amenity,
      "name"
    );
    _this.nearPlace = getArrayValue(payload.near_place, "name");
  },
  methods: {
    submit() {
      let dataPack = new FormData();
      if (
        this.additionalAmenities.length === 0 &&
        this.nearPlace.length === 0
      ) {
        this.imgs.forEach(img => {
          dataPack.append("imgs[]", img);
        });
        dataPack.append("detail_address", this.detailAddress);
        dataPack.append("id_ward", this.idWard);
        dataPack.append("title", this.title);
        dataPack.append(
          "with_owner",
          this.amenities.includes("with_owner") ? 1 : 0
        );
        dataPack.append(
          "restroom",
          this.amenities.includes("restroom") ? 1 : 0
        );
        dataPack.append("kitchen", this.amenities.includes("kitchen") ? 1 : 0);
        dataPack.append(
          "water_heater",
          this.amenities.includes("water_heater") ? 1 : 0
        );
        dataPack.append(
          "air_conditioner",
          this.amenities.includes("air_conditional") ? 1 : 0
        );
        dataPack.append("balcony", this.amenities.includes("balcony") ? 1 : 0);
        dataPack.append("id_room_type", this.categorySelected);
        dataPack.append("square", this.area);
        dataPack.append("price", this.price);
        dataPack.append("info_detail", this.description);
        dataPack.append("electricity_price", this.electricityPrice);
        dataPack.append("water_price", this.waterPrice);
        dataPack.append("time_to_display", this.timeToLive);
      } else if (
        this.additionalAmenities.length === 0 &&
        this.nearPlace.length !== 0
      ) {
        this.imgs.forEach(img => {
          dataPack.append("imgs[]", img);
        });
        dataPack.append("detail_address", this.detailAddress);
        dataPack.append("id_ward", this.idWard);
        dataPack.append("title", this.title);
        dataPack.append(
          "with_owner",
          this.amenities.includes("with_owner") ? 1 : 0
        );
        dataPack.append(
          "restroom",
          this.amenities.includes("restroom") ? 1 : 0
        );
        dataPack.append("kitchen", this.amenities.includes("kitchen") ? 1 : 0);
        dataPack.append(
          "water_heater",
          this.amenities.includes("water_heater") ? 1 : 0
        );
        dataPack.append(
          "air_conditioner",
          this.amenities.includes("air_conditional") ? 1 : 0
        );
        dataPack.append("balcony", this.amenities.includes("balcony") ? 1 : 0);
        dataPack.append("id_room_type", this.categorySelected);
        dataPack.append("square", this.area);
        dataPack.append("price", this.price);
        dataPack.append("info_detail", this.description);
        dataPack.append("electricity_price", this.electricityPrice);
        dataPack.append("water_price", this.waterPrice);
        this.nearPlace.forEach(place => {
          dataPack.append("near_place[]", place);
        });
        dataPack.append("time_to_display", this.timeToLive);
      } else if (
        this.nearPlace.length === 0 &&
        this.additionalAmenities.length !== 0
      ) {
        this.imgs.forEach(img => {
          dataPack.append("imgs[]", img);
        });
        dataPack.append("detail_address", this.detailAddress);
        dataPack.append("id_ward", this.idWard);
        dataPack.append("title", this.title);
        dataPack.append(
          "with_owner",
          this.amenities.includes("with_owner") ? 1 : 0
        );
        dataPack.append(
          "restroom",
          this.amenities.includes("restroom") ? 1 : 0
        );
        dataPack.append("kitchen", this.amenities.includes("kitchen") ? 1 : 0);
        dataPack.append(
          "water_heater",
          this.amenities.includes("water_heater") ? 1 : 0
        );
        dataPack.append(
          "air_conditioner",
          this.amenities.includes("air_conditional") ? 1 : 0
        );
        dataPack.append("balcony", this.amenities.includes("balcony") ? 1 : 0);
        dataPack.append("id_room_type", this.categorySelected);
        dataPack.append("square", this.area);
        dataPack.append("price", this.price);
        dataPack.append("info_detail", this.description);
        dataPack.append("electricity_price", this.electricityPrice);
        dataPack.append("water_price", this.waterPrice);
        this.additionalAmenities.forEach(amenity => {
          dataPack.append("additional_amenity[]", amenity);
        });
        dataPack.append("time_to_display", this.timeToLive);
      } else {
        this.imgs.forEach(img => {
          dataPack.append("imgs[]", img);
        });
        dataPack.append("detail_address", this.detailAddress);
        dataPack.append("id_ward", this.idWard);
        dataPack.append("title", this.title);
        dataPack.append(
          "with_owner",
          this.amenities.includes("with_owner") ? 1 : 0
        );
        dataPack.append(
          "restroom",
          this.amenities.includes("restroom") ? 1 : 0
        );
        dataPack.append("kitchen", this.amenities.includes("kitchen") ? 1 : 0);
        dataPack.append(
          "water_heater",
          this.amenities.includes("water_heater") ? 1 : 0
        );
        dataPack.append(
          "air_conditioner",
          this.amenities.includes("air_conditional") ? 1 : 0
        );
        dataPack.append("balcony", this.amenities.includes("balcony") ? 1 : 0);
        dataPack.append("id_room_type", this.categorySelected);
        dataPack.append("square", this.area);
        dataPack.append("price", this.price);
        dataPack.append("info_detail", this.description);
        dataPack.append("electricity_price", this.electricityPrice);
        dataPack.append("water_price", this.waterPrice);
        this.additionalAmenities.forEach(amenity => {
          dataPack.append("additional_amenity[]", amenity);
        });
        this.nearPlace.forEach(place => {
          dataPack.append("near_place[]", place);
        });
        dataPack.append("time_to_display", this.timeToLive);
      }
      HomeServices.postEditPost(this.$route.params.id, dataPack).then(
        response => {
          this.active = true;
          this.message = response.data;
        }
      );
    }
  }
};
</script>

<style scoped></style>
