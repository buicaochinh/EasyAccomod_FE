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
              :type="{ 'is-danger': errors[0] }"
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
              <b-checkbox native-value="with_owner" v-model="amenities">
                Chung chủ
              </b-checkbox>
              <b-checkbox native-value="restroom" v-model="amenities">
                Nhà vệ sinh
              </b-checkbox>
              <b-checkbox native-value="kitchen" v-model="amenities">
                Nhà bếp
              </b-checkbox>
              <b-checkbox native-value="water_heater" v-model="amenities">
                Nóng lạnh
              </b-checkbox>
              <b-checkbox native-value="air_conditioner" v-model="amenities">
                Điều hòa
              </b-checkbox>
              <b-checkbox native-value="balcony" v-model="amenities">
                Ban công
              </b-checkbox>
            </div>
          </b-field>
        </ValidationProvider>
        <b-field label="Tiện ích khác">
          <div class="field">
            <b-taginput v-model="additionalAmenities"></b-taginput>
          </div>
        </b-field>
        <b-field label="Khu vực">
          <div class="field">
            <b-taginput v-model="nearPlace"></b-taginput>
          </div>
        </b-field>
        <ValidationProvider
          rules="required"
          name="Description"
          v-slot="{ errors }"
        >
          <b-field
            label="Thông tin chi tiết: "
            :type="{ 'is-danger': errors[0] }"
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
          <button class="button is-primary" @click="handleSubmit(submit)">
            <span>Đăng tin</span>
          </button>
          <router-link class="button is-danger" :to="{ name: 'ManagePosts' }">
            <span>Quay lại</span>
          </router-link>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import SelectAddress from "../../../components/SelectAddress";
import UploadComponent from "../../../components/UploadComponent";

import HomeServices from "../../../apis/modules/home";

import { ValidationObserver, ValidationProvider } from "vee-validate";
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
  mounted() {
    setTimeout(() => {
      HomeServices.getCategory().then(response => {
        this.categories = response.data.room_types;
      });
    }, 500);
  },
  methods: {
    submit: function() {
      console.log(this.imgs[0]);
      let dataPack = new FormData();
      if (
        this.additionalAmenities.length === 0 &&
        this.nearPlace.length === 0
      ) {
        this.imgs.forEach(img => {
          dataPack.append("imgs[]", img);
        });
        dataPack.append("status", 1);
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
        dataPack.append("status", 1);
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
        dataPack.append("status", 1);
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
        dataPack.append("status", 1);
      }
      HomeServices.postNewPost(dataPack).then(response => {
        this.active = true;
        this.message = response.data;
      });
    }
  }
};
</script>

<style scoped></style>
