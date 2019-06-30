import Vue from "vue";
import Vuex from "vuex";
import { auth } from "./auth.module";
import { todo } from "./todo.module";

/**
 * Vuex store based on two modules:
 * - user: store & manage authentication state
 * - todo: store & manage todos
 * 
 * Both modules, do not perform axios REST request in their own,
 * for that service classes are used from 'services' folder.
 * 
 * All the REST requests are wrapped with try...catch,
 * so you can easily handle exceptions.
 */

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    todo
  }
});
