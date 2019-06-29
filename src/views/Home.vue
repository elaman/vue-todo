<template>
  <div>
    <h1>Home</h1>

    <button v-if="loggedIn" @click.prevent="logout">Logout</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "home",

  computed: {
    ...mapGetters("auth", ["loggedIn"])
  },
  
  methods: {
    ...mapActions("auth", ["logout"])
  }
};
</script>