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
        id: todo.nid[0].value,
        body: todo.title[0].value,
        completed: status
      }));
    } catch (error) {
      throw new TodoError(
        error.response.status,
        error.response.data.detail
      );
    }
  },

  insert: async function(title) {
    const csrfToken = await this.getCsrfToken();

    const requestData = {
      method: "post",
      url: "/node?_format=json",
      headers: { 'X-CSRF-Token': csrfToken },
      data: {
        type: "todo",
        title: [title],
        status: [false]
      }
    };

    try {
      const response = await ApiService.customRequest(requestData);

      return {
        id: response.data.nid[0].value,
        body: response.data.title[0].value,
        completed: response.data.status[0].value,
      };
    } catch (error) {
      throw new TodoError(
        error.response.status,
        error.response.data.detail
      );
    }
  },

  delete: async function(id) {
    const csrfToken = await this.getCsrfToken();

    const requestData = {
      method: "delete",
      url: `/node/${id}?_format=json`,
      headers: { 'X-CSRF-Token': csrfToken }
    };

    try {
      await ApiService.customRequest(requestData);
    } catch (error) {
      throw new TodoError(
        error.response.status,
        error.response.data.detail
      );
    }
  },

  getCsrfToken: async function() {
    try {
      const response = await ApiService.get("/session/token");

      return response.data;
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
