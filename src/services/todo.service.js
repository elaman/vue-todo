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
    const requestData = {
      method: "post",
      url: "/jsonapi/node/todo",
      headers: { "Content-Type": "application/vnd.api+json" },
      data: {
        data: {
          type: "node--todo",
          attributes: {
            title: todo.title,
            field_completed: false
          }
        }
      }
    };

    try {
      const response = await ApiService.customRequest(requestData);

      return {
        id: response.data.data.id,
        title: response.data.data.attributes.title,
        completed: response.data.data.attributes.field_completed
      };
    } catch (error) {
      throw new TodoError(error.response.status, error.response.message);
    }
  },

  update: async function(todo) {
    const requestData = {
      method: "patch",
      url: `/jsonapi/node/todo/${todo.id}`,
      headers: { "Content-Type": "application/vnd.api+json" },
      data: {
        data: {
          type: "node--todo",
          id: todo.id,
          attributes: {
            title: todo.title,
            field_completed: todo.completed
          }
        }
      }
    };

    try {
      const response = await ApiService.customRequest(requestData);

      return {
        id: response.data.data.id,
        title: response.data.data.attributes.title,
        completed: response.data.data.attributes.field_completed
      };
    } catch (error) {
      throw new TodoError(error.response.status, error.response.message);
    }
  },

  delete: async function(todo) {
    try {
      await ApiService.delete(`/jsonapi/node/todo/${todo.id}`);
    } catch (error) {
      throw new TodoError(error.response.status, error.response.message);
    }
  }
};

export default TodoService;

export { TodoService, TodoError };
