<template>
  <div class="container">
    <div class="section">
      <div class="wrapper">
        <h3 class="title is-3">Thay đổi mật khẩu</h3>
        <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
          <!-- the "handleSubmit" function on the slot-scope executes the callback if validation was successfull -->

          <div class="section">
            <ValidationProvider
              rules="required"
              vid="password"
              name="Password"
              v-slot="{ errors, valid }"
            >
              <b-field
                label="Mật khẩu cũ:"
                :type="{ 'is-danger': errors[0], 'is-success': valid }"
                :message="errors"
              >
                <b-input
                  type="password"
                  v-model="oldPassword"
                  placeholder="Password"
                ></b-input>
              </b-field>
            </ValidationProvider>
            <ValidationProvider
              rules="required"
              vid="password"
              name="Password"
              v-slot="{ errors, valid }"
            >
              <b-field
                label="Mật khẩu mới:"
                :type="{ 'is-danger': errors[0], 'is-success': valid }"
                :message="errors"
              >
                <b-input
                  type="password"
                  v-model="newPassword"
                  placeholder="Password"
                ></b-input>
              </b-field>
            </ValidationProvider>
            <ValidationProvider
              rules="required|confirmed:password"
              name="Password Confirmation"
              v-slot="{ errors, valid }"
            >
              <b-field
                label="Xác nhận mật khẩu:"
                :type="{ 'is-danger': errors[0], 'is-success': valid }"
                :message="errors"
              >
                <b-input
                  type="password"
                  v-model="confirmNewPassword"
                  placeholder="Password"
                  @keyup.native="enterKey"
                ></b-input>
              </b-field>
              <div
                v-if="status === 1"
                class="notification is-success is-light mb-1"
              >
                Đổi mật khẩu thành công!
              </div>
              <div
                v-if="status === 2"
                class="notification is-danger is-light mb-1"
              >
                Mật khẩu không đúng
              </div>
            </ValidationProvider>
            <div class="buttons">
              <button class="button is-success" @click="handleSubmit(submit)">
                Xác nhận
              </button>
              <router-link :to="{ name: 'User' }" class="button is-danger">
                Hủy
              </router-link>
              <button class="button" @click="resetForm">
                <span>Reset</span>
              </button>
            </div>
          </div>
        </ValidationObserver>
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
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      status: 0
    };
  },
  methods: {
    submit() {
      this.$store
        .dispatch("AUTH/sendChangePasswordRequest", {
          old_password: this.oldPassword,
          new_password: this.newPassword,
          password_confirmation: this.confirmNewPassword
        })
        .then(() => {
          this.status = 1;
        })
        .catch(() => {
          this.status = 2;
        });
    },
    resetForm() {
      this.oldPassword = "";
      this.newPassword = "";
      this.confirmNewPassword = "";
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
div.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
