import Vue from "vue";
import Vuex, { Store } from "vuex";
import axios from "axios";

Vue.use(Vuex);

let _sandbox = axios.create({ baseURL: "//localhost:3000/api", timeout: 3000 });

export default new Vuex.Store({
  state: {
    bugs: []
  },
  mutations: {
    addBug(state, bug) {
      state.bugs.push(bug);
    }
  },
  actions: {
    async getBugs({ commit, dispatch }) {
      let res = await _sandbox.get("bugs");
      commit("setAllBugs", res.data);
    },

    async getBugById({ commit, dispatch }, id) {
      let res = await _sandbox.get("bugs/" + id);
      commit("setActiveBug", res.data);
    },

    async addBug({ commit, dispatch }, bug) {
      let res = await _sandbox.post("bugs", bug);
      commit("addBug", res.data);
    },

    async editBug({ commit, dispatch }, id) {
      let res = await _sandbox.put("bugs/" + id);
      commit("editBug", res.data);
    },

    async deleteBug({ commit, dispatch }, id) {
      let res = await _sandbox.delete("bugs/" + id);
      dispatch("getBugs");
    }
  },
  modules: {}
});
