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
            </ValidationProvider>
            <div class="buttons">
              <button class="button is-success" @click="handleSubmit(submit)">
                Xác nhận
              </button>
              <router-link :to="{ name: 'User' }" class="button is-danger">
                Hủy
              </router-link>
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
      confirmNewPassword: ""
    };
  },
  methods: {
    submit() {
      console.log("Submit");
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

.form {
  width: 40rem;
  margin-bottom: 1rem;
}
</style>
