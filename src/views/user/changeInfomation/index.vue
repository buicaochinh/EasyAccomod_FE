<template>
  <div class="container">
    <div class="section">
      <div class="wrapper">
        <div class="section">
          <figure class="image is-128x128">
            <img class="is-rounded" src="@/assets/user.png" />
          </figure>
        </div>
        <div class="section">
          <div class="content">
            <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
              <div v-if="status === 1" class="notification is-success is-light">
                Cập nhật thành công
              </div>
              <div v-if="status === 2" class="notification is-danger is-light">
                Cập nhật thất bại
              </div>
              <ValidationProvider
                rules="required"
                name="Username"
                v-slot="{ errors, valid }"
              >
                <b-field
                  label="Họ và tên:"
                  :type="{ 'is-danger': errors[0], 'is-success': valid }"
                  :message="errors"
                >
                  <b-input
                    type="text"
                    v-model="username"
                    placeholder="Họ và tên"
                  ></b-input>
                </b-field>
              </ValidationProvider>
              <ValidationProvider
                rules="required|email"
                name="Email"
                v-slot="{ errors, valid }"
              >
                <b-field
                  label="Email:"
                  :type="{ 'is-danger': errors[0], 'is-success': valid }"
                  :message="errors"
                >
                  <b-input
                    type="email"
                    v-model="email"
                    placeholder="example@gmail.com"
                    disabled="true"
                  ></b-input>
                </b-field>
              </ValidationProvider>
              <ValidationProvider
                rules="required"
                name="DetailAddress"
                v-slot="{ errors, valid }"
              >
                <b-field
                  label="Địa chỉ"
                  :type="{ 'is-danger': errors[0], 'is-success': valid }"
                  :message="errors"
                >
                  <b-input
                    type="text"
                    v-model="address"
                    placeholder="Địa chỉ"
                  ></b-input>
                </b-field>
              </ValidationProvider>
              <ValidationProvider
                rules="required|numeric"
                name="NationalIdNumber"
                v-slot="{ errors, valid }"
              >
                <b-field
                  label="Số CMND/CCCD:"
                  :type="{ 'is-danger': errors[0], 'is-success': valid }"
                  :message="errors"
                >
                  <b-input
                    type="text"
                    v-model="nationalIdNumber"
                    placeholder="Số CMND/CCCD"
                  ></b-input>
                </b-field>
              </ValidationProvider>
              <ValidationProvider
                :rules="{
                  required: true,
                  regex: /^(([\+]([\d]{2,}))([0-9\.\-\/\s]{5,})|([0-9\.\-\/\s]{5,}))*$/
                }"
                name="Phone"
                v-slot="{ errors, valid }"
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
              <SelectAddress @wardSelect="idWard = $event" />
              <div class="buttons is-centered">
                <button class="button is-info" @click="handleSubmit(submit)">
                  <span>Chấp nhận</span>
                </button>
                <router-link class="button is-danger" :to="{ name: 'User' }">
                  <span>Hủy</span>
                </router-link>
                <button class="button" @click="resetForm">
                  <span>Reset</span>
                </button>
              </div>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserServices from "../../../apis/modules/user";

import { ValidationObserver, ValidationProvider } from "vee-validate";
import SelectAddress from "../../../components/SelectAddress";
export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    SelectAddress
  },
  data: () => ({
    email: "",
    username: "",
    address: "",
    nationalIdNumber: "",
    phone: "",
    idWard: -1,
    status: 0,
    message: ""
  }),
  mounted() {
    if (this.$store.getters["AUTH/user"] === null) {
      this.email = "";
      this.username = "";
      this.address = "";
      this.nationalIdNumber = "";
      this.phone = "";
    } else {
      this.email = this.$store.getters["AUTH/user"].email;
      this.username = this.$store.getters["AUTH/user"].name;
      this.address = this.$store.getters["AUTH/user"].detail_address;
      this.nationalIdNumber = this.$store.getters[
        "AUTH/user"
      ].national_id_number;
      this.phone = this.$store.getters["AUTH/user"].phone;
    }
  },
  methods: {
    submit() {
      let dataPack = {};
      if (this.idWard !== -1) {
        dataPack = {
          name: this.username,
          detail_address: this.address,
          national_id_number: this.nationalIdNumber,
          phone: this.phone,
          id_ward: this.idWard
        };
      } else {
        dataPack = {
          name: this.username,
          detail_address: this.address,
          national_id_number: this.nationalIdNumber,
          phone: this.phone
        };
      }
      UserServices.editProfile(dataPack).then(() => {
        if (this.$store.getters.errors.length === 0) {
          this.status = 1;
        } else {
          this.status = 2;
        }
      });
    },
    resetForm() {
      if (this.$store.getters["AUTH/user"] === null) {
        this.email = "";
        this.username = "";
        this.address = "";
        this.nationalIdNumber = "";
        this.phone = "";
      } else {
        this.email = this.$store.getters["AUTH/user"].email;
        this.username = this.$store.getters["AUTH/user"].name;
        this.address = this.$store.getters["AUTH/user"].detail_address;
        this.nationalIdNumber = this.$store.getters[
          "AUTH/user"
        ].national_id_number;
        this.phone = this.$store.getters["AUTH/user"].phone;
      }
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

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.content {
  width: 50vw;
}
</style>
