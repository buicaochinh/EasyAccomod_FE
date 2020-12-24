<template>
  <div class="form">
    <h3 class="title is-3">Thêm tài khoản</h3>
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <!-- the "handleSubmit" function on the slot-scope executes the callback if validation was successfull -->
      <ValidationProvider
        rules="required|email"
        name="Email"
        v-slot="{ errors, valid }"
      >
        <b-field
          :type="{ 'is-danger': errors[0], 'is-success': valid }"
          :message="errors"
          label="Email:"
        >
          <b-input type="email" v-model="email" placeholder="Email"></b-input>
        </b-field>
      </ValidationProvider>

      <ValidationProvider
        rules="required"
        name="Username"
        v-slot="{ errors, valid }"
      >
        <b-field
          :type="{ 'is-danger': errors[0], 'is-success': valid }"
          :message="errors"
          label="Họ và tên:"
        >
          <b-input
            type="text"
            v-model="username"
            placeholder="Họ và tên"
          ></b-input>
        </b-field>
      </ValidationProvider>

      <ValidationProvider
        rules="required"
        name="NationalIdNumber"
        v-slot="{ errors, valid }"
      >
        <b-field
          :type="{ 'is-danger': errors[0], 'is-success': valid }"
          :message="errors"
          label="Số CMND/CCCD:"
        >
          <b-input
            type="text"
            v-model="nationalIdNumber"
            placeholder="1234567890"
          ></b-input>
        </b-field>
      </ValidationProvider>

      <ValidationProvider
        rules="required"
        name="DetailAddress"
        v-slot="{ errors, valid }"
      >
        <b-field
          :type="{ 'is-danger': errors[0], 'is-success': valid }"
          :message="errors"
          label="Địa chỉ:"
        >
          <b-input
            type="text"
            v-model="detailAddress"
            placeholder="Ngõ ** đường **"
          ></b-input>
        </b-field>
      </ValidationProvider>

      <div class="block">
        <SelectAddress @wardSelect="idWard = $event" />
      </div>
      <div class="columns">
        <div class="column is-three-quarters">
          <ValidationProvider
            rules="required"
            name="Phone"
            v-slot="{ errors, valid }"
          >
            <b-field
              :type="{ 'is-danger': errors[0], 'is-success': valid }"
              :message="errors"
              label="Số điện thoại:"
            >
              <b-input
                type="text"
                v-model="phone"
                placeholder="0987654321"
              ></b-input>
            </b-field>
          </ValidationProvider>
        </div>
        <div class="column">
          <ValidationProvider
            rules="required"
            name="Role"
            v-slot="{ errors, valid }"
          >
            <b-field
              :type="{ 'is-danger': errors[0], 'is-success': valid }"
              :message="errors"
              label="Loại tài khoản:"
            >
              <b-select v-model="idRole" expanded>
                <option value="1">Người thuê trọ</option>
                <option value="2">Chủ nhà trọ</option>
                <option value="3">Admin</option>
              </b-select>
            </b-field>
          </ValidationProvider>
        </div>
      </div>

      <div v-if="alert === 1" class="block notification is-success is-light">
        Sửa thành công
      </div>

      <div v-if="alert === 2" class="block notification is-danger is-light">
        Sửa thất bại
      </div>

      <div class="buttons mt-5 is-centered">
        <button class="button is-primary" @click="handleSubmit(submit)">
          <span>Submit</span>
        </button>

        <button class="button" @click="resetForm">
          <span>Reset</span>
        </button>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import AdminServices from "../../../apis/modules/admin";

import { ValidationObserver, ValidationProvider } from "vee-validate";
import SelectAddress from "@/components/SelectAddress";
export default {
  name: "AdminEditUser",
  components: {
    ValidationObserver,
    ValidationProvider,
    SelectAddress
  },
  created() {
    this.$emit("update:layout", "AdminLayout");
    AdminServices.getUserById(this.$route.params.id).then(response => {
      this.user = response.data.data;
      this.email = response.data.data.email;
      this.username = response.data.data.name;
      this.phone = response.data.data.phone;
      this.detailAddress = response.data.data.detail_address;
      this.nationalIdNumber = response.data.data.national_id_number;
      this.idRole = response.data.data.id_role;
      this.idWard = response.data.data.id_ward;
    });
  },
  data() {
    return {
      email: "",
      username: "",
      phone: "",
      detailAddress: "",
      nationalIdNumber: "",
      idWard: 0,
      idRole: 1,
      alert: 0,
      user: {}
    };
  },
  methods: {
    submit() {
      let dataPack = {
        _method: "PATCH",
        name: this.username,
        phone: this.phone,
        detail_address: this.detailAddress,
        national_id_number: this.nationalIdNumber,
        id_ward: this.idWard,
        email: this.email,
        id_role: this.idRole
      };
      AdminServices.postEditUser(this.$route.params.id, dataPack).then(() => {
        if (this.$store.getters.errors.length !== 0) {
          this.alert = 2;
          this.$store.commit("setErrors", []);
        } else {
          this.alert = 1;
        }
      });
    },
    resetForm() {
      this.email = this.user.email;
      this.username = this.user.name;
      this.phone = this.user.phone;
      this.detailAddress = this.user.detail_address;
      this.nationalIdNumber = this.user.national_id_number;
      this.idRole = this.user.id_role;
      requestAnimationFrame(() => {
        this.$refs.observer.reset();
      });
    },
    enterKey(event) {
      if (event.key === "Enter") {
        this.submit();
      }
    }
  }
};
</script>

<style scoped></style>
