import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/Buefy";
import "./plugins/vee-validate";
import "./assets/css/global.css";

Vue.config.productionTip = false;

Vue.filter("toCurrency", function(value) {
  if (typeof value !== "number") {
    return value;
  }
  let formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0
  });
  return formatter.format(value);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
