import Vue from "vue";
import App from "./App.vue";
import ApiService from "./services/api.service";
import { TokenService } from "./services/token.service";

ApiService.init("https://dev-d8-charts.pantheonsite.io");

if (TokenService.getToken()) {
  ApiService.setHeader();
}

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
