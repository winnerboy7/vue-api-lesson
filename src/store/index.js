import Vue from "vue";
import Vuex from "vuex";

import { alert } from "./modules/alert.module";
import { account } from "./modules/account.module";
// import { users } from "./modules/user.module";
import { vuetify } from "./modules/vuetify.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    alert,
    account,
    // users,
    vuetify,
  },

  state: {
  },

  getters: {
  },

  mutations: {
  },
  
  actions: {},  
});
