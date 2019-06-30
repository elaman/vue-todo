<template>
  <div class="card">
    <div class="card-header">
      Current
      <span class="badge badge-info">{{currentTodos.length}}</span>
    </div>
    <div v-for="todo in currentTodos" v-bind:key="todo.id" class="card-body">
      <h5 class="card-title">{{todo.title}}</h5>
      <div class="btn-group btn-group-sm mr-2" role="group" aria-label="Operations">
        <button @click="completeTodo(todo)" type="button" class="btn btn-outline-success">Complete</button>
        <button @click="removeTodo(todo)" type="button" class="btn btn-outline-danger">Remove</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  methods: {
    ...mapActions("todo", ["completeTodo", "removeTodo"])
  },
  computed: { ...mapGetters("todo", ["currentTodos"]) }
};
</script>