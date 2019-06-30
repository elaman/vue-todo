import ApiService from "./api.service";

class TodoError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
  }
}

const TodoService = {
  getAll: async function() {
    try {
      const response = await ApiService.get("/node/todos?_format=json");

      return response.data.map(todo => ({
        nid: todo.nid[0].value,
        body: todo.title[0].value,
        completed: !status
      }));
    } catch (error) {
      throw new TodoError(
        error.response.status,
        error.response.data.detail
      );
    }
  },
};

export default TodoService;

export { TodoService, TodoError };
