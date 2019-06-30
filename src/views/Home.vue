<template>
  <div class="col-md-7 py-3">
    <h1 class="display-4 mb-5 text-center">Home</h1>

    <NewTodo></NewTodo>

    <div class="row">
      <div class="col-md-6 mb-3">
        <CurrentTodos></CurrentTodos>
      </div>
      <div class="col-md-6 mb-3">
        <CompletedTodos></CompletedTodos>
      </div>
    </div>
  </div>
</template>

<script>
import NewTodo from "../components/NewTodo.vue";
import CurrentTodos from "../components/CurrentTodos.vue";
import CompletedTodos from "../components/CompletedTodos.vue";

export default {
  components: {
    NewTodo,
    CurrentTodos,
    CompletedTodos
  }
};
</script>