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
                <option value="2">Admin</option>
                <option value="3">Chủ nhà trọ</option>
              </b-select>
            </b-field>
          </ValidationProvider>
        </div>
      </div>

      <ValidationProvider
        rules="required"
        vid="password"
        name="Password"
        v-slot="{ errors, valid }"
      >
        <b-field
          :type="{ 'is-danger': errors[0], 'is-success': valid }"
          :message="errors"
          label="Mật khẩu:"
        >
          <b-input
            type="password"
            v-model="password"
            placeholder="Mật khẩu"
          ></b-input>
        </b-field>
      </ValidationProvider>

      <ValidationProvider
        rules="required|confirmed:password"
        name="Password Confirmation"
        v-slot="{ errors, valid }"
      >
        <b-field
          :type="{ 'is-danger': errors[0], 'is-success': valid }"
          :message="errors"
          label="Nhập lại mật khẩu:"
        >
          <b-input
            type="password"
            v-model="confirmation"
            placeholder="Nhập lại mật khẩu"
            @keyup.native="enterKey"
          ></b-input>
        </b-field>
      </ValidationProvider>

      <div v-if="alert === 1" class="block notification is-success is-light">
        Thêm thành công
      </div>

      <div v-if="alert === 2" class="block notification is-danger is-light">
        Tài khoản đã tồn tại
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
  name: "AdminAddUser",
  components: {
    ValidationObserver,
    ValidationProvider,
    SelectAddress
  },
  created() {
    this.$emit("update:layout", "AdminLayout");
  },
  data() {
    return {
      email: "",
      username: "",
      phone: "",
      password: "",
      confirmation: "",
      detailAddress: "",
      nationalIdNumber: "",
      idWard: 0,
      idRole: 1,
      alert: 0
    };
  },
  methods: {
    submit() {
      let dataPack = {
        name: this.username,
        phone: this.phone,
        detail_address: this.detailAddress,
        national_id_number: this.nationalIdNumber,
        id_ward: this.idWard,
        email: this.email,
        password: this.password,
        password_confirmation: this.confirmation,
        id_role: this.idRole
      };
      AdminServices.postAddUser(dataPack).then(() => {
        if (this.$store.getters.errors.length !== 0) {
          this.alert = 2;
          this.$store.commit("setErrors", []);
        } else {
          this.alert = 1;
        }
      });
    },
    resetForm() {
      this.email = "";
      this.username = "";
      this.password = "";
      this.confirmation = "";
      this.phone = "";
      this.detailAddress = "";
      this.nationalIdNumber = "";
      this.idRole = 1;
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
