<template>
  <div class="form-wrapper">
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <!-- the "handleSubmit" function on the slot-scope executes the callback if validation was successfull -->
      <section class="section">
        <ValidationProvider
          rules="required|email"
          name="Email"
          v-slot="{ errors, valid }"
        >
          <b-field
            label="Email"
            :type="{ 'is-danger': errors[0], 'is-success': valid }"
            :message="errors"
          >
            <b-input type="email" v-model="email"></b-input>
          </b-field>
        </ValidationProvider>

        <ValidationProvider
          rules="required"
          vid="password"
          name="Password"
          v-slot="{ errors, valid }"
        >
          <b-field
            label="Password"
            :type="{ 'is-danger': errors[0], 'is-success': valid }"
            :message="errors"
          >
            <b-input type="password" v-model="password"></b-input>
          </b-field>
        </ValidationProvider>

        <div class="buttons">
          <button
            class="button is-success is-fullwidth"
            @click="handleSubmit(submit)"
          >
            <span class="icon is-small">
              <i class="fas fa-check"></i>
            </span>
            <span>Submit</span>
          </button>

          <button class="button is-fullwidth" @click="resetForm">
            <span class="icon is-small">
              <i class="fas fa-redo"></i>
            </span>
            <span>Reset</span>
          </button>
        </div>
      </section>
    </ValidationObserver>
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
    password: ""
  }),
  created() {
    this.$emit("update:layout", "AuthLayout");
  },
  methods: {
    submit() {
      console.log("Form submitted yay!");
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
  width: 40rem;
}
</style>
