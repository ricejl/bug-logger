import Vue from "vue";
import Vuex, { Store } from "vuex";
import axios from "axios";

Vue.use(Vuex);

let _api = axios.create({ baseURL: "//localhost:3000/api", timeout: 6000 });

export default new Vuex.Store({
  state: {
    bugs: [],
    activeBug: {},
    notes: []
  },
  mutations: {
    setAllBugs(state, data) {
      state.bugs = data;
    },

    addBug(state, bug) {
      state.bugs.push(bug);
    },

    setActiveBug(state, bug) {
      state.activeBug = bug;
    },

    setAllNotes(state, data) {
      state.notes = data;
    },

    addNote(state, note) {
      state.notes.push(note);
    }
  },
  actions: {
    async getBugs({ commit, dispatch }) {
      let res = await _api.get("bugs");
      commit("setAllBugs", res.data);
    },

    async getBugById({ commit, dispatch }, id) {
      let res = await _api.get("bugs/" + id);
      commit("setActiveBug", res.data);
    },

    async reportBug({ commit, dispatch }, bug) {
      let res = await _api.post("bugs", bug);
      commit("addBug", res.data);
      commit("setActiveBug", res.data);
    },

    async editBug({ commit, dispatch }, { id, bug }) {
      console.log("id and edited bug before api put request", id, bug);
      let res = await _api.put("bugs/" + id, bug);
      dispatch("getBugById", res.data.id);
    },

    async deleteBug({ commit, dispatch }, id) {
      let res = await _api.delete("bugs/" + id);
      dispatch("getBugById", id);
    },

    async getNotes({ commit, dispatch }, id) {
      let res = await _api.get("bugs/" + id + "/notes");
      commit("setAllNotes", res.data);
    },

    async createNote({ commit, dispatch }, note) {
      let res = await _api.post("notes", note);
      commit("addNote", res.data);
    },

    async deleteNote({ commit, dispatch }, { noteId, bugId }) {
      let res = await _api.delete("notes/" + noteId);
      dispatch("getNotes", bugId);
    }
  },
  modules: {}
});
