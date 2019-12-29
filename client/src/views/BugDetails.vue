<template>
  <body class="container-fluid">
    <header class="row">
      <div class="col p-0">
        <nav class="navbar navbar-light bg-light">
          <a class="navbar-brand" href="#">
            <router-link :to="{ name: 'home' }">
              <h3>
                <!-- prettier-ignore-attribute -->
                B
                <i class="fas fa-bug"></i>g Tracker
              </h3>
            </router-link>
          </a>
        </nav>
      </div>
    </header>
    <main>
      <div class="row">
        <div class="col">
          <h5 class="pt-4 pb-2">Title: {{ bug.title }}</h5>
          <p class="pb-1" id="reported-by">Reported by: {{ bug.reportedBy }}</p>
          <p id="status">Status: {{ formatStatus }}</p>
          <p class="border rounded p-3">{{ bug.description }}</p>
          <button
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            Edit
          </button>
          <button class="btn btn-danger" @click="closeBug">Close</button>
        </div>
        <!-- FIXME modal not working -->
        <!-- <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                ...
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div> -->
      </div>
      <div class="row">
        <div class="col pt-5">
          <h5>Notes</h5>
          <table class="notes table table-striped table-dark text-left">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Message</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody v-for="note in notes" :key="note.id">
              <!-- SECTION rows to be vue components -->
              <note-component :noteData="note" />
            </tbody>
          </table>

          <!-- TODO add notes table drawing from notes component; notes can be added or removed -->
        </div>
      </div>
      <div class="row">
        <div class="col">
          <form @submit.prevent="createNote">
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
        </div>
      </div>
    </main>
  </body>
</template>

<script>
import NoteComponent from "@/components/NoteComponent";

export default {
  name: "bugDetails",
  mounted() {
    this.$store.dispatch("getBugById", this.$route.params.id);
    this.$store.dispatch("getNotes", this.$route.params.id);
    // FIXME status does not automatically update once bug is closed. page must be refreshed.
    // FIXME notes do not populate after page refresh despite the network showing status 200 OK for notes get request
  },
  data() {
    return {
      newNote: {
        reportedBy: "",
        content: "",
        bug: this.$route.params.id
      }
    };
  },
  components: {
    NoteComponent
  },
  methods: {
    closeBug() {
      this.$swal({
        title: "Are you sure?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, close it",
        cancelButtonText: "No, cancel",
        showCloseButton: true
      }).then(result => {
        if (result.value) {
          this.$swal("Closed", "Bug status is now closed");
          this.$store.dispatch("deleteBug", this.$route.params.id);
        } else {
          this.$swal("Cancelled", "Bug status remains open");
        }
      });
      // FIXME sweetalert not formatted correctly
    },
    editBug() {
      let d = document.getElementById("desc");
      if (d.contentEditable) {
        d.contentEditable = false;
      }
      // TODO
      //bring up modal prepopulated with active bug title, reported by, desc
      //dispatch("editBug", id, and body)
      //must also add body to fns in store
    },
    createNote() {
      let note = { ...this.newNote };
      this.$store.dispatch("createNote", note);
      this.newNote = {
        reportedBy: "",
        content: "",
        bug: this.$route.params.id
      };
    }
  },
  computed: {
    bug() {
      return this.$store.state.activeBug;
    },
    formatStatus() {
      if (this.bug.closed) {
        this.bug.closed = "closed";
      } else {
        this.bug.closed = "open";
      }
      return this.bug.closed;
    },
    notes() {
      return this.$store.state.notes;
    }
  }
};
</script>

<style>
#reported-by,
#status {
  display: inline-flex;
}

#status {
  justify-content: right;
  position: absolute;
  right: 1em;
}
</style>
