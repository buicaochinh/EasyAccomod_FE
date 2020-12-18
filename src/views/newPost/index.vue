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
              <b-select placeholder="Danh mục" v-model="category" expanded>
                <option value="1">Phòng trọ cho thuê</option>
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
                @keyup.native="enterKey"
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
            label="Mô tả ngắn: "
            :type="{ 'is-danger': errors[0] }"
            :message="errors"
          >
            <b-input type="textarea" v-model="description"></b-input>
          </b-field>
        </ValidationProvider>
        <UploadComponent />
        <div class="buttons is-centered mt-5">
          <button class="button is-info" @click="handleSubmit(submit)">
            <span>Đăng tin</span>
          </button>
          <router-link class="button is-danger" :to="{ name: 'Home' }">
            <span>Quay lại</span>
          </router-link>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import SelectAddress from "../../components/SelectAddress";
import UploadComponent from "../../components/UploadComponent";

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
      category: "",
      phone: "",
      description: "",
      isWard: -1
    };
  }
};
</script>

<style scoped></style>
