<template>
  <div class="form-wrapper">
    <a href="/" style="text-align: center">
      <div class="logo-section">
        <div class="logo-text">
          <span style="color: dodgerblue">Easy</span
          ><span style="color: black">Accomod</span>
        </div>
      </div>
    </a>
    <div class="form-content">
      <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
        <!-- the "handleSubmit" function on the slot-scope executes the callback if validation was successfull -->
        <section class="section">
          <p
            style="padding-bottom: 2.5rem; font-size: 1.75rem; text-align: center"
          >
            ĐĂNG KÝ
          </p>
          <ValidationProvider
            rules="required|email"
            name="Email"
            v-slot="{ errors, valid }"
          >
            <b-field
              :type="{ 'is-danger': errors[0], 'is-success': valid }"
              :message="errors"
            >
              <b-input
                type="email"
                v-model="email"
                placeholder="Email"
                icon-pack="fas"
                icon="envelope"
              ></b-input>
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
            >
              <b-input
                type="text"
                v-model="username"
                placeholder="Họ và tên"
                icon-pack="fas"
                icon="user"
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
              :type="{ 'is-danger': errors[0], 'is-success': valid }"
              :message="errors"
            >
              <b-input
                type="password"
                v-model="password"
                placeholder="Mật khẩu"
                icon-pack="fas"
                icon="key"
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
            >
              <b-input
                type="password"
                v-model="confirmation"
                placeholder="Nhập lại mật khẩu"
                icon-pack="fas"
                icon="key"
                @keyup.native="enterKey"
              ></b-input>
            </b-field>
          </ValidationProvider>

          <p style="text-align: center; margin: 1rem 0">
            Bạn đã có tải khoản?
            <router-link :to="{ name: 'Login' }">Đăng nhập</router-link>
          </p>

          <div class="buttons">
            <button
              class="button is-info is-fullwidth"
              @click="handleSubmit(submit)"
            >
              <span>Submit</span>
            </button>

            <button class="button is-fullwidth" @click="resetForm">
              <span>Reset</span>
            </button>
          </div>
          <p style="text-align: center">
            <router-link :to="{ name: 'Home' }">Trang chủ</router-link>
          </p>
        </section>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data: () => ({
    email: "",
    username: "",
    password: "",
    confirmation: ""
  }),
  computed: {
    ...mapGetters(["errors"])
  },
  created() {
    this.$emit("update:layout", "AuthLayout");
  },
  methods: {
    ...mapActions("AUTH", ["sendRegisterRequest"]),
    submit() {
      this.sendRegisterRequest({
        name: this.username,
        email: this.email,
        password: this.password,
        password_confirmation: this.confirmation
      }).then(() => {
        this.$router.push({ name: "Home" });
      });
    },
    resetForm() {
      this.email = "";
      this.username = "";
      this.password = "";
      this.confirmation = "";
      this.phone = "";
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
.form-wrapper {
  background-color: white;
  width: 55vh;
  margin: 0 auto;
  height: 100%;
  padding-top: 55px;
}

.form-content {
  padding: 20px;
  -moz-box-shadow: 0 0 5px 5px #f1f1f1;
  -webkit-box-shadow: 0 0 5px 5px #f1f1f1;
  box-shadow: 0 0 5px 5px #f1f1f1;
}

.logo-section {
  display: flex;
  height: 100%;
  justify-content: center;
  padding: 20px 20px 40px 20px;
}

.logo-text {
  padding-top: 5px;
  padding-left: 5px;
  align-items: center;
  font-size: 48px;
  font-weight: bold;
}

a {
  color: dodgerblue;
}

a:hover {
  color: #2c3e50;
}
</style>
