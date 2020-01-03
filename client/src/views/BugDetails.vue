<template>
  <body class="container-fluid">
    <header class="row">
      <div class="col p-0">
        <nav class="navbar navbar-light">
          <a class="navbar-brand" href="#">
            <router-link :to="{ name: 'home' }">
              <h3 id="bug-tracker">
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
          <p class="border rounded p-3">
            {{ bug.description }}
            <i
              class="fas fa-edit pl-1"
              title="edit"
              @click="editBugForm(bug)"
            ></i>
          </p>
          <button class="btn btn-danger" @click="closeBug">Close</button>
        </div>
      </div>
      <div class="row pl-3 pr-3">
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
        </div>
      </div>
      <div class="row">
        <div class="col pt-5">
          <!-- TODO add button to make new note appear -->
          <new-note></new-note>
        </div>
      </div>
    </main>
    <footer></footer>
  </body>
</template>

<script>
import NoteComponent from "@/components/NoteComponent";
import NewNote from "@/components/NewNote";

export default {
  name: "bugDetails",
  mounted() {
    this.$store.dispatch("getBugById", this.$route.params.id);
    this.$store.dispatch("getNotes", this.$route.params.id);
  },
  data() {
    return {};
  },
  components: {
    NoteComponent,
    NewNote
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
          this.$store.dispatch("deleteBug", this.$route.params.id);
        }
      });
      // FIXME sweetalert not formatted correctly
    },
    editBugForm(bug) {
      if (bug.closed == "open") {
        this.$swal({
          title: "Edit bug",
          html:
            "<form id='swal-edit-bug' @submit.prevent='editBug'>" +
            "<label for='swal-title'>Title</label>" +
            "<textarea id='swal-title' rows='1'>" +
            bug.title +
            "</textarea>" +
            "<label for='swal-reportedBy'>Reported by</label>" +
            "<input id='swal-reportedBy' value=" +
            bug.reportedBy +
            ">" +
            "<label for='swal-description'>Description</label>" +
            "<textarea id='swal-description' rows='5'>" +
            bug.description +
            "</textarea></<label>" +
            "</form>",
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonText: "Submit",
          preConfirm: () => {
            let editedBug = {
              title: document.getElementById("swal-title").value,
              reportedBy: document.getElementById("swal-reportedBy").value,
              description: document.getElementById("swal-description").value
            };
            return editedBug;
          }
        }).then(result => {
          if (result.value) {
            this.$store.dispatch("editBug", {
              id: this.$route.params.id,
              bug: result.value
            });
          }
        });
      } else if (bug.closed == "closed") {
        this.$swal({
          type: "error",
          title: "Oops!",
          text: "Closed bugs cannot be edited."
        });
      }
    },
    newNote() {
      NewNote;
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
body {
  background-color: #fff1cf;
}
.navbar {
  background-color: #015668;
}

#bug-tracker {
  color: #ffd369;
}

#reported-by,
#status {
  display: inline-flex;
}

#status {
  justify-content: right;
  position: absolute;
  right: 1em;
}

#swal-edit-bug {
  display: flex;
  flex-direction: column;
}

label[for="swal-title"],
label[for="swal-reportedBy"],
label[for="swal-description"] {
  padding-top: 1em;
  text-align: left;
}

footer {
  min-height: 8vh;
}

.fa-edit {
  cursor: pointer;
  opacity: 0.3;
}

.fa-edit:hover {
  opacity: 0.7;
}
</style>
