<template>
  <div class="card">
    <div class="card-header">
      Completed
      <span class="badge badge-info">{{completedTodos.length}}</span>
    </div>
    <div v-for="todo in completedTodos" v-bind:key="todo.id" class="card-body">
      <h5 class="card-title">{{todo.title}}</h5>
      <div class="btn-group btn-group-sm mr-2" role="group" aria-label="Operations">
        <button @click="removeTodo(todo)" type="button" class="btn btn-outline-danger">Remove</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  methods: { ...mapActions("todo", ["removeTodo"]) },
  computed: { ...mapGetters("todo", ["completedTodos"]) }
};
</script>