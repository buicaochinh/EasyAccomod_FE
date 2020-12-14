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

        <ValidationProvider
          rules="required|confirmed:password"
          name="Password Confirmation"
          v-slot="{ errors, valid }"
        >
          <b-field
            label="Confirm Password"
            :type="{ 'is-danger': errors[0], 'is-success': valid }"
            :message="errors"
          >
            <b-input type="password" v-model="confirmation"></b-input>
          </b-field>
        </ValidationProvider>

        <ValidationProvider
          rules="required"
          name="Subject"
          v-slot="{ errors, valid }"
        >
          <b-field
            label="Subject"
            :message="errors"
            :type="{ 'is-danger': errors[0], 'is-success': valid }"
          >
            <b-select placeholder="Select a subject" v-model="subject">
              <option value>None</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </b-select>
          </b-field>
        </ValidationProvider>

        <ValidationProvider
          rules="required|length:2"
          name="Drinks"
          v-slot="{ errors }"
        >
          <div class="block">
            <b-checkbox v-model="choices" native-value="Coffee"
              >Coffee</b-checkbox
            >
            <b-checkbox v-model="choices" native-value="Tea">Tea</b-checkbox>
            <b-checkbox v-model="choices" native-value="Soda">Soda</b-checkbox>
            <p class="has-text-danger">{{ errors[0] }}</p>
          </div>
        </ValidationProvider>

        <div class="buttons">
          <button class="button is-success" @click="handleSubmit(submit)">
            <span class="icon is-small">
              <i class="fas fa-check"></i>
            </span>
            <span>Submit</span>
          </button>

          <button class="button" @click="resetForm">
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
    password: "",
    confirmation: "",
    subject: "",
    choices: []
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
      this.confirmation = "";
      this.subject = "";
      this.choices = [];
      requestAnimationFrame(() => {
        this.$refs.observer.reset();
      });
    }
  }
};
</script>
