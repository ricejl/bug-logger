<template>
  <form @submit.prevent="createNote" class="border rounded p-5 ml-5 mr-5">
    <h5 class="text-center">New Note</h5>
    <div class="form-group">
      <label for="name">Name</label>
      <input
        type="text"
        v-model="newNote.reportedBy"
        id="name"
        class="form-control"
        placeholder="Your name..."
        required
      />
    </div>
    <div class="form-group">
      <label for="note">Note</label>
      <textarea
        v-model="newNote.content"
        id="note"
        class="form-control"
        cols="1"
        rows="5"
        placeholder="Add comment..."
        required
      ></textarea>
    </div>
    <button class="btn btn-success">Submit</button>
  </form>
</template>

<script>
export default {
  name: "newNote",
  data() {
    return {
      newNote: {
        reportedBy: "",
        content: "",
        bug: this.$route.params.id
      }
    };
  },
  methods: {
    createNote() {
      let note = { ...this.newNote };
      this.$store.dispatch("createNote", note);
      this.newNote = {
        reportedBy: "",
        content: "",
        bug: this.$route.params.id
      };
    }
  }
};
</script>

<style></style>
