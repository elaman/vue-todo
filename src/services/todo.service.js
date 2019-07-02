import ApiService from "./api.service";

// Special type of error for auth errors.
class TodoError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
  }
}

// Service that is used to perform REST requests via ApiService class.
// Please read README.md file for details and information links.
// REST requests and responses require special json structure.
// For response samples see: https://gist.github.com/elaman/6a8f64caa5937194e662389210a9b8b8
const TodoService = {

  getAll: async function() {
    try {
      // GET request to get all todos, doesn't require special request.
      const response = await ApiService.get("/jsonapi/node/todo");

      return response.data.data.map(node => ({
        id: node.id,
        title: node.attributes.title,
        completed: node.attributes.field_completed
      }));
    } catch (error) {
      throw new TodoError(error.response.status, error.response.message);
    }
  },

  insert: async function(todo) {
    // POST request needs csrf token. See method definition for details.
    const csrfToken = await this.getCsrfToken();

    const requestData = {
      method: "post",
      url: "/node?_format=json",
      headers: { "X-CSRF-Token": csrfToken },
      data: {
        // type is required.
        type: "todo",
        // fields values must be in array.
        title: [todo.title],
        field_completed: [false]
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
      throw new TodoError(error.response.status, error.response.message);
    }
  },

  update: async function(todo) {
    // PATCH request needs csrf token. See method definition for details.
    const csrfToken = await this.getCsrfToken();

    const requestData = {
      method: "patch",
      url: `/node/${todo.id}?_format=json`,
      headers: { "X-CSRF-Token": csrfToken },
      data: {
        // type is required.
        type: "todo",
        // fields values must be in array.
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
      throw new TodoError(error.response.status, error.response.message);
    }
  },

  delete: async function(todo) {
    // DELETE request needs csrf token. See method definition for details.
    const csrfToken = await this.getCsrfToken();

    const requestData = {
      method: "delete",
      url: `/node/${todo.id}?_format=json`,
      headers: { "X-CSRF-Token": csrfToken }
    };

    try {
      await ApiService.customRequest(requestData);
    } catch (error) {
      throw new TodoError(error.response.status, error.response.message);
    }
  },

  getCsrfToken: async function() {
    try {
      // CSRF token request doesn't require special request.
      // Returns string, not JSON.
      // Please see README.md for details.
      const response = await ApiService.get("/session/token");

      return response.data;
    } catch (error) {
      throw new TodoError(error.response.status, error.response.message);
    }
  }
};

export default TodoService;

export { TodoService, TodoError };
