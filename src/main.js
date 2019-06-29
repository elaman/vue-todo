import Vue from "vue";
import ApiService from "./services/api.service";
import router from "./router";
import { TokenService } from "./services/token.service";
import store from "./store";
import App from "./App.vue";

ApiService.init(process.env.VUE_APP_API_URL);

if (TokenService.getToken()) {
  ApiService.setHeader();
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
