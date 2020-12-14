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
            style="padding-bottom: 1rem; font-size: 1.5rem; text-align: center"
          >
            ĐĂNG NHẬP
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
                placeholder="Password"
              ></b-input>
            </b-field>
          </ValidationProvider>
          <p style="text-align: center">
            Bạn chưa có tải khoản?
            <router-link :to="{ name: 'Register' }">Đăng ký</router-link>
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
    password: ""
  }),
  computed: {
    ...mapGetters(["errors"])
  },
  created() {
    this.$emit("update:layout", "AuthLayout");
  },
  methods: {
    ...mapActions("AUTH", ["sendLoginRequest"]),
    submit() {
      this.sendLoginRequest({
        email: this.email,
        password: this.password
      })
        .then(() => {
          this.$router.push({ name: "Home" });
        })
        .catch(e => console.log(e));
    },
    resetForm() {
      this.email = "";
      this.password = "";
      requestAnimationFrame(() => {
        this.$refs.observer.reset();
      });
    }
  }
};
</script>

<style scoped>
.form-wrapper {
  background-color: white;
  width: 40vh;
  margin: 0 auto;
  height: 100%;
  padding-top: 100px;
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
  padding: 20px;
}

.logo-text {
  padding-top: 5px;
  padding-left: 5px;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  color: lightcoral;
}
</style>
