import { UserService, AuthenticationError } from "../services/user.service";
import { TokenService } from "../services/storage.service";
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
  async login({ commit }, { email, password }) {
    commit("loginRequest");

    try {
      const token = await UserService.login(email, password);
      commit("loginSuccess", token);

      router.push(router.history.current.query.redirect || "/");

      return true;
    } catch (e) {
      if (e instanceof AuthenticationError) {
        commit("loginError", {
          errorCode: e.errorCode,
          errorMessage: e.message
        });
      }

      return false;
    }
  },

  logout({ commit }) {
    UserService.logout();
    commit("logoutSuccess");
    router.push("/login");
  },

  refreshToken({ commit, state }) {
    if (!state.refreshTokenPromise) {
      const p = UserService.refreshToken();
      commit("refreshTokenPromise", p);

      p.then(
        response => {
          commit("refreshTokenPromise", null);
          commit("loginSuccess", response);
        },
        error => {
          commit("refreshTokenPromise", null);
        }
      );
    }

    return state.refreshTokenPromise;
  }
};

const mutations = {
  loginRequest(state) {
    state.authenticating = true;
    state.authenticationError = "";
    state.authenticationErrorCode = 0;
  },

  loginSuccess(state, accessToken) {
    state.accessToken = accessToken;
    state.authenticating = false;
  },

  loginError(state, { errorCode, errorMessage }) {
    state.authenticating = false;
    state.authenticationErrorCode = errorCode;
    state.authenticationError = errorMessage;
  },

  logoutSuccess(state) {
    state.accessToken = "";
  },

  refreshTokenPromise(state, promise) {
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
