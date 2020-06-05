import { authenController } from "@/controllers";
// import { router } from "@/router";

const user = JSON.parse(localStorage.getItem("user"));
const state = user
  ? { status: { loggedIn: true }, user }
  : { status: {}, user: null };

const mutations = {
  LOGIN_REQUEST(state, user) {
    state.status = { loggingIn: true };
    state.user = user;
  },
  LOGIN_SUCCESS(state, user) {
    state.status = { loggedIn: true };
    state.user = user;
  },
  LOGIN_FAILURE(state) {
    state.status = {};
    state.user = null;
  },
  LOGOUT(state) {
    state.status = {};
    state.user = null;
  },
};

const actions = {
  login({ dispatch, commit }, { username, password }) {
    commit("LOGIN_REQUEST", { username });

    authenController.login(username, password).then(
      user => {
        commit("LOGIN_SUCCESS", user);
        dispatch("alert/success", "ยินดีต้อนรับ : " + username, { root: true });
        // this.$router.push("/");
      },
      error => {
        commit("LOGIN_FAILURE", error);
        dispatch("alert/error", error, { root: true });
      }
    );
  },

  logout({ commit }) {
    authenController.logout();
    commit("LOGOUT");    
  },
};

export const account = {
  namespaced: true,
  state,
  actions,
  mutations
};

