<template>
  <div class="input-group mb-3">
    <input
      :value="newTodo"
      @change="handleGetTodo"
      type="text"
      class="form-control"
      placeholder="I need to..."
      aria-label="Todo text"
      aria-describedby="new-todo"
    />
    <div class="input-group-append">
      <button @click="handleAddTodo" class="btn btn-outline-success" type="button" id="new-todo">Add</button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  methods: {
    ...mapActions("todo", ["getTodo", "addTodo", "clearTodo"]),

    handleGetTodo(event) {
      this.getTodo(event.target.value);
    },
    handleAddTodo() {
      this.addTodo();
      this.clearTodo();
    }
  },
  computed: { ...mapGetters("todo", ["newTodo"]) }
};
</script>