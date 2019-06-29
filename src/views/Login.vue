<template>
  <form @submit.prevent="handleSubmit" action="#" method="post">
    <label for="username">
      Username:
      <input id="username" v-model="username">
    </label>
    <label for="password">
      Password:
      <input id="password" v-model="password">
    </label>
    <input type="submit" value="Submit">
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "login",

  data() {
    return {
      username: "",
      password: ""
    };
  },

  computed: {
    ...mapGetters("auth", [
      "authenticating",
      "authenticationError",
      "authenticationErrorCode"
    ])
  },
  
  methods: {
    ...mapActions("auth", ["login"]),
    handleSubmit() {
      if (this.username !== "" && this.password !== "") {
        this.login({ username: this.username, password: this.password });
        this.password = "";
      }
    }
  }
};
</script>