import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    links: [
      {
        icon: "face",
        content: "sign up",
        router_link: "/sign_up",
      },
      {
        icon: "lock_open",
        content: "login",
        router_link: "/login",
      },
    ],
  },
  mutations: {
    links(state, option) {
      return (state.links = option);
    },
  },
});
