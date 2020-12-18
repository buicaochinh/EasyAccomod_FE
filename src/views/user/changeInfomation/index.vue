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
                  label="Địa chỉ:"
                  :type="{ 'is-danger': errors[0], 'is-success': valid }"
                  :message="errors"
                >
                  <b-input
                    type="text"
                    v-model="address"
                    placeholder="Vui lòng nhập dịa chỉ"
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
              <div class="buttons">
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
import { ValidationObserver, ValidationProvider } from "vee-validate";
export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data: () => ({
    email: "",
    username: "",
    address: "",
    nationalIdNumber: "",
    phone: ""
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
      console.log("Submit!");
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
</style>
