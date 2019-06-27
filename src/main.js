import Vue from "vue";
import ApiService from "./services/api.service";
import router from "./router";
import { TokenService } from "./services/token.service";

ApiService.init("https://dev-d8-charts.pantheonsite.io");

if (TokenService.getToken()) {
  ApiService.setHeader();
}

new Vue({
  router,
  template: `
    <div>
      <router-view class="view"></router-view>
    </div>
  `
}).$mount("#app");
