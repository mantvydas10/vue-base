// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});

Vue.config.productionTip = false;

Vue.use(VueToast, {
  duration: 3000,
  dismissible: true,
  position: "top"
});
