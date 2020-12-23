<template>
  <div class="form-wrapper">
    <a href="/" style="text-align: center">
      <div class="logo-section">
        <div class="logo-text">
          <span style="color: #7957d6">Easy</span
          ><span style="color: black">Accomod</span>
          <span class="tag is-primary is-light">Admin</span>
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
            WELLCOME ADMIN
          </p>
          <div v-if="wrongCred" class="notification is-danger is-light">
            Đăng nhập không thành công!
          </div>
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
                icon-pack="fas"
                icon="key"
                @keyup.native="enterKey"
              ></b-input>
            </b-field>
          </ValidationProvider>
          <div class="buttons mt-5 is-centered">
            <button
              class="button is-primary is-fullwidth"
              @click="handleSubmit(submit)"
            >
              <span>Đăng nhập</span>
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
    password: "",
    wrongCred: false
  }),
  computed: {
    ...mapGetters(["errors"])
  },
  watch: {
    email(val) {
      this.wrongCred = false;
      return val;
    },
    password(val) {
      this.wrongCred = false;
      return val;
    }
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
      }).then(response => {
        if (typeof response === "undefined") {
          this.$router.push({ name: "Dashboard" });
        } else {
          this.wrongCred = true;
        }
      });
    },
    resetForm() {
      this.email = "";
      this.password = "";
      requestAnimationFrame(() => {
        this.$refs.observer.reset();
        this.wrongCred = false;
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
}

a {
  color: #7957d6;
}

a:hover {
  color: #2c3e50;
}

span.tag.is-primary.is-light {
  position: relative;
  bottom: 10px;
}
</style>
