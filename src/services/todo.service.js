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

      return response.data.map(node => ({
        id: node.nid[0].value,
        title: node.title[0].value,
        completed: node.field_completed[0].value
      }));
    } catch (error) {
      throw new TodoError(error.response.status, error.response.data.detail);
    }
  },

  insert: async function(todo) {
    const csrfToken = await this.getCsrfToken();

    const requestData = {
      method: "post",
      url: "/node?_format=json",
      headers: { "X-CSRF-Token": csrfToken },
      data: {
        type: "todo",
        title: [todo.title],
        status: [false]
      }
    };

    try {
      const response = await ApiService.customRequest(requestData);

      return {
        id: response.data.nid[0].value,
        title: response.data.title[0].value,
        completed: response.data.field_completed[0].value
      };
    } catch (error) {
      throw new TodoError(error.response.status, error.response.data.detail);
    }
  },

  update: async function(todo) {
    const csrfToken = await this.getCsrfToken();

    const requestData = {
      method: "patch",
      url: `/node/${todo.id}?_format=json`,
      headers: { "X-CSRF-Token": csrfToken },
      data: {
        type: "todo",
        title: [todo.title],
        field_completed: [todo.completed]
      }
    };

    try {
      const response = await ApiService.customRequest(requestData);

      return {
        id: response.data.nid[0].value,
        title: response.data.title[0].value,
        completed: response.data.status[0].value
      };
    } catch (error) {
      throw new TodoError(error.response.status, error.response.data.detail);
    }
  },

  delete: async function(todo) {
    const csrfToken = await this.getCsrfToken();

    const requestData = {
      method: "delete",
      url: `/node/${todo.id}?_format=json`,
      headers: { "X-CSRF-Token": csrfToken }
    };

    try {
      await ApiService.customRequest(requestData);
    } catch (error) {
      throw new TodoError(error.response.status, error.response.data.detail);
    }
  },

  getCsrfToken: async function() {
    try {
      const response = await ApiService.get("/session/token");

      return response.data;
    } catch (error) {
      throw new TodoError(error.response.status, error.response.data.detail);
    }
  }
};

export default TodoService;

export { TodoService, TodoError };
