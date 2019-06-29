import Vue from "vue";
import ApiService from "./services/api.service";
import router from "./router";
import { TokenService } from "./services/token.service";
import store from "./store";

ApiService.init(process.env.TODO_API_URL);

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
