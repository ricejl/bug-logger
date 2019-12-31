<template>
  <tr>
    <td>{{ noteData.reportedBy }}</td>
    <td>{{ noteData.content }}</td>
    <td><i @click="deleteNote(noteData.id)" class="far fa-trash-alt"></i></td>
  </tr>
</template>

<script>
export default {
  name: "note",
  props: ["noteData"],
  methods: {
    deleteNote(id) {
      this.$swal({
        title: "Are you sure?",
        type: "warning",
        showCancelButton: "true",
        confirmButtonText: "Yes, delete note",
        cancelButtonText: "No, keep it",
        showCloseButton: true
      }).then(result => {
        if (result.value) {
          //   this.$swal("Deleted");
          this.$store.dispatch("deleteNote", {
            noteId: id,
            bugId: this.$route.params.id
          });
        }
      });
    }
  }
};
</script>

<style></style>
