import ApiService from "./api.service";

const TodoService = {
  async insert(todo){
    const csrf = this.getCsrf();

    return false;
  },

  async update(todo){
    const csrf = this.getCsrf();

    return false;
  },

  async delete(todo){
    const csrf = this.getCsrf();

    return false;
  },

  async getCsrf(){
    try {
      const response = await ApiService.get("/session/token");

      return response.data;
    } catch (error) {
      return false;
    }
  },
};

export default TodoService;

export { TodoService };
