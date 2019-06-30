const state = {
  todos: [],
  newTodo: ''
};

const getters = {
  newTodo: state => state.newTodo,
  todos: state => state.todos,
  completedTodos: state => state.todos.filter((todo) => {return todo.completed}),
  currentTodos: state => state.todos.filter((todo) => {return !todo.completed})
};

const actions = {
  getTodo({commit}, todo){
    commit('GET_TODO', todo)
  },

  addTodo({commit}){
    commit('ADD_TODO')
  },

  editTodo({commit}, todo){
    commit('EDIT_TODO', todo)
  },

  removeTodo({commit}, todo){
    commit('REMOVE_TODO', todo)
  },

  completeTodo({commit}, todo){
   commit('COMPLETE_TODO', todo)
  },

  clearTodo({commit}){
    commit('CLEAR_TODO')
  }
};

const mutations = {
  GET_TODO(state, todo){
    state.newTodo = todo
  },

  ADD_TODO(state){
    state.todos.push({
      id: Math.random().toString(36).substring(2, 15),
      body: state.newTodo,
      completed: false
    })
  },

  EDIT_TODO(state, todo){
     var todos = state.todos
     todos.splice(todos.indexOf(todo), 1)
     state.todos = todos
     state.newTodo = todo.body
  },

  REMOVE_TODO(state, todo){
     var todos = state.todos
     todos.splice(todos.indexOf(todo), 1)
  },

  COMPLETE_TODO(state, todo){
    todo.completed = !todo.completed
  },

  CLEAR_TODO(state){
    state.newTodo = ''
  }
};

export const todo = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
