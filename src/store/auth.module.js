import { UserService, AuthenticationError } from "../services/user.service";
import { TokenService } from "../services/token.service";
import router from "../router";

const state = {
  authenticating: false,
  accessToken: TokenService.getToken(),
  authenticationErrorCode: 0,
  authenticationError: "",
  refreshTokenPromise: null
};

const getters = {
  loggedIn: state => {
    return state.accessToken ? true : false;
  },

  authenticationErrorCode: state => {
    return state.authenticationErrorCode;
  },

  authenticationError: state => {
    return state.authenticationError;
  },

  authenticating: state => {
    return state.authenticating;
  }
};

const actions = {
  async login({ commit }, { username, password }) {
    commit("LOGIN_REQUEST");

    try {
      const token = await UserService.login(username, password);
      commit("LOGIN_SUCCESS", token);

      router.push(router.history.current.query.redirect || "/");

      return true;
    } catch (e) {
      if (e instanceof AuthenticationError) {
        commit("LOGIN_ERROR", {
          errorCode: e.errorCode,
          errorMessage: e.message
        });
      }

      return false;
    }
  },

  logout({ commit }) {
    UserService.logout();
    commit("LOGOUT_SUCCESS");
    router.push("/login");
  },

  refreshToken({ commit, state }) {
    if (!state.refreshTokenPromise) {
      const promise = UserService.refreshToken();
      commit("REFRESH_TOKEN_PROMISE", promise);

      promise.then(
        response => {
          commit("REFRESH_TOKEN_PROMISE", null);
          commit("LOGIN_SUCCESS", response);
        },
        () => {
          commit("REFRESH_TOKEN_PROMISE", null);
        }
      );
    }

    return state.refreshTokenPromise;
  }
};

const mutations = {
  LOGIN_REQUEST(state) {
    state.authenticating = true;
    state.authenticationError = "";
    state.authenticationErrorCode = 0;
  },

  LOGIN_SUCCESS(state, accessToken) {
    state.accessToken = accessToken;
    state.authenticating = false;
  },

  LOGIN_ERROR(state, { errorCode, errorMessage }) {
    state.authenticating = false;
    state.authenticationErrorCode = errorCode;
    state.authenticationError = errorMessage;
  },

  LOGOUT_SUCCESS(state) {
    state.accessToken = "";
  },

  REFRESH_TOKEN_PROMISE(state, promise) {
    state.refreshTokenPromise = promise;
  }
};

export const auth = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
