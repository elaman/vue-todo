<template>
  <div class="card">
    <div class="card-header">
      Current
      <span class="badge badge-info">{{currentTodos.length}}</span>
    </div>
    <div v-for="todo in currentTodos" v-bind:key="todo.id" class="card-body">
      <h5 class="card-title">{{todo.body}}</h5>
      <div class="btn-group btn-group-sm mr-2" role="group" aria-label="Operations">
        <button @click="editTodo(todo)" type="button" class="btn btn-outline-primary">Edit</button>
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
    ...mapActions("todo", ["editTodo", "completeTodo", "removeTodo"])
  },
  computed: { ...mapGetters("todo", ["currentTodos"]) }
};
</script>