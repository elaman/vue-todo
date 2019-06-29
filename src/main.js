import Vue from "vue";
import ApiService from "./services/api.service";
import router from "./router";
import { TokenService } from "./services/token.service";
import store from "./store";

ApiService.init("https://dev-d8-charts.pantheonsite.io");

if (TokenService.getToken()) {
  ApiService.setHeader();
}

new Vue({
  router,
  store,
  template: `
    <div>
      <router-view class="view"></router-view>
    </div>
  `
}).$mount("#app");
