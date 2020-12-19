<template>
  <div class="container">
    <div class="section">
      <h3 class="title is-3">Đăng tin cho thuê phòng</h3>
      <div class="block section is-danger is-light">
        {{ message }}
      </div>
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
        </div>
        <div class="columns">
          <ValidationProvider
            rules="required"
            name="Category"
            v-slot="{ errors }"
            class="column is-one-fifth"
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
            :rules="{
              required: true,
              regex: /^(([\+]([\d]{2,}))([0-9\.\-\/\s]{5,})|([0-9\.\-\/\s]{5,}))*$/
            }"
            name="Phone"
            v-slot="{ errors, valid }"
            class="column"
          >
            <b-field
              label="Số điện thoại:"
              :type="{ 'is-danger': errors[0], 'is-success': valid }"
              :message="errors"
            >
              <b-input
                type="text"
                v-model="phone"
                placeholder="0987654321"
              ></b-input>
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
        <UploadComponent @addFiles="imgs = $event" />
        <div class="buttons is-centered mt-5">
          <button class="button is-info" @click="handleSubmit(submit)">
            <span>Đăng tin</span>
          </button>
          <router-link class="button is-danger" :to="{ name: 'Home' }">
            <span>Quay lại</span>
          </router-link>
        </div>
      </ValidationObserver>
      {{ imgs }}
    </div>
  </div>
</template>

<script>
import SelectAddress from "../../components/SelectAddress";
import UploadComponent from "../../components/UploadComponent";

import HomeServices from "../../apis/modules/home";

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
      phone: "",
      description: "",
      idWard: -1,
      electricityPrice: 0,
      waterPrice: 0,
      amenities: [],
      additionalAmenities: [],
      nearPlace: [],
      imgs: [],
      message: ""
    };
  },
  watch: {
    imgs(val) {
      console.log(val);
    }
  },
  mounted() {
    setTimeout(() => {
      HomeServices.getCategory().then(response => {
        this.categories = response.data.room_types;
      });
    }, 500);
  },
  methods: {
    submit() {
      let dataPack = {};
      if (
        this.additionalAmenities.length === 0 &&
        this.nearPlace.length === 0
      ) {
        dataPack = {
          imgs: this.imgs,
          detail_address: this.detailAddress,
          id_ward: this.idWard,
          title: this.title,
          with_owner: this.amenities.includes("with_owner") ? 1 : 0,
          restroom: this.amenities.includes("restroom") ? 1 : 0,
          kitchen: this.amenities.includes("kitchen") ? 1 : 0,
          water_heater: this.amenities.includes("water_heater") ? 1 : 0,
          air_conditioner: this.amenities.includes("air_conditional") ? 1 : 0,
          balcony: this.amenities.includes("balcony") ? 1 : 0,
          id_room_type: this.categorySelected,
          square: this.area,
          price: this.price,
          info_detail: this.description,
          electricity_price: this.electricityPrice,
          water_price: this.waterPrice
        };
      } else if (
        this.additionalAmenities.length === 0 &&
        this.nearPlace.length !== 0
      ) {
        dataPack = {
          imgs: this.imgs,
          detail_address: this.detailAddress,
          id_ward: this.idWard,
          title: this.title,
          with_owner: this.amenities.includes("with_owner") ? 1 : 0,
          restroom: this.amenities.includes("restroom") ? 1 : 0,
          kitchen: this.amenities.includes("kitchen") ? 1 : 0,
          water_heater: this.amenities.includes("water_heater") ? 1 : 0,
          air_conditioner: this.amenities.includes("air_conditional") ? 1 : 0,
          balcony: this.amenities.includes("balcony") ? 1 : 0,
          id_room_type: this.categorySelected,
          square: this.area,
          price: this.price,
          info_detail: this.description,
          electricity_price: this.electricityPrice,
          water_price: this.waterPrice,
          near_place: this.nearPlace
        };
      } else if (
        this.nearPlace.length === 0 &&
        this.additionalAmenities.length !== 0
      ) {
        dataPack = {
          imgs: this.imgs,
          detail_address: this.detailAddress,
          id_ward: this.idWard,
          title: this.title,
          with_owner: this.amenities.includes("with_owner") ? 1 : 0,
          restroom: this.amenities.includes("restroom") ? 1 : 0,
          kitchen: this.amenities.includes("kitchen") ? 1 : 0,
          water_heater: this.amenities.includes("water_heater") ? 1 : 0,
          air_conditioner: this.amenities.includes("air_conditional") ? 1 : 0,
          balcony: this.amenities.includes("balcony") ? 1 : 0,
          id_room_type: this.categorySelected,
          square: this.area,
          price: this.price,
          info_detail: this.description,
          electricity_price: this.electricityPrice,
          water_price: this.waterPrice,
          additional_amenity: this.additionalAmenities
        };
      } else {
        dataPack = {
          imgs: this.imgs,
          detail_address: this.detailAddress,
          id_ward: this.idWard,
          title: this.title,
          with_owner: this.amenities.includes("with_owner") ? 1 : 0,
          restroom: this.amenities.includes("restroom") ? 1 : 0,
          kitchen: this.amenities.includes("kitchen") ? 1 : 0,
          water_heater: this.amenities.includes("water_heater") ? 1 : 0,
          air_conditioner: this.amenities.includes("air_conditional") ? 1 : 0,
          balcony: this.amenities.includes("balcony") ? 1 : 0,
          id_room_type: this.categorySelected,
          square: this.area,
          price: this.price,
          info_detail: this.description,
          electricity_price: this.electricityPrice,
          water_price: this.waterPrice,
          additional_amenity: this.additionalAmenities,
          near_place: this.nearPlace
        };
      }
      HomeServices.postNewPost(dataPack).then(response => {
        this.message = response.data;
      });
    }
  }
};
</script>

<style scoped></style>
