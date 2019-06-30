import { TodoService, TodoError } from "../services/todo.service";

// Todos and new todo form state.
const state = {
  todos: [],
  newTodo: ""
};

// Computed variables.
const getters = {
  newTodo: state => state.newTodo,

  todos: state => state.todos,

  completedTodos: state =>
    state.todos.filter(todo => {
      return todo.completed;
    }),

  currentTodos: state =>
    state.todos.filter(todo => {
      return !todo.completed;
    })
};

// Actions change store state.
// All the async functions rely on REST requests.
// All REST requests are made in TodoService.
const actions = {
  // Get all nodes.
  async loadTodos({ commit }) {
    try {
      const todos = await TodoService.getAll();

      commit("LOAD_TODOS", todos);
    } catch (e) {
      if (e instanceof TodoError) {
        // Handle error.
      }
    }
  },

  // Create new todo.
  async addTodo({ commit, state }) {
    try {
      const todo = await TodoService.insert({
        title: state.newTodo
      });

      commit("ADD_TODO", todo);
    } catch (e) {
      if (e instanceof TodoError) {
        // Handle error.
      }
    }
  },

  // Remove todo.
  async removeTodo({ commit }, todo) {
    try {
      await TodoService.delete({
        id: todo.id
      });

      commit("REMOVE_TODO", todo);
    } catch (e) {
      if (e instanceof TodoError) {
        // Handle error.
      }
    }
  },

  // Update todo.
  async completeTodo({ commit }, todo) {
    try {
      await TodoService.update({
        ...todo,
        completed: !todo.completed
      });

      commit("COMPLETE_TODO", todo);
    } catch (e) {
      if (e instanceof TodoError) {
        // Handle error.
      }
    }
  },
  
  // Each time new todo field is changed, update newTodo state.
  getTodo({ commit }, todo) {
    commit("GET_TODO", todo);
  },

  // Clear the new todo form.
  clearTodo({ commit }) {
    commit("CLEAR_TODO");
  }
};

// Manage store.
const mutations = {
  GET_TODO(state, todo) {
    state.newTodo = todo;
  },

  LOAD_TODOS(state, todos) {
    state.todos = [...todos];
  },

  ADD_TODO(state, todo) {
    state.todos.push(todo);
  },

  REMOVE_TODO(state, todo) {
    var todos = state.todos;
    todos.splice(todos.indexOf(todo), 1);
  },

  COMPLETE_TODO(state, todo) {
    todo.completed = !todo.completed;
  },

  CLEAR_TODO(state) {
    state.newTodo = "";
  }
};

export const todo = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
