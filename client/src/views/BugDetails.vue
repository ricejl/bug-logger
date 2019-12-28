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
          <button class="btn btn-info" @click="editBug">Edit</button>
          <button class="btn btn-danger" @click="closeBug">Close</button>
        </div>
      </div>
      <div class="row">
        <div class="col pt-5">
          <h5>Notes</h5>
          <!-- TODO add notes table drawing from notes component; notes can be added or removed -->
        </div>
      </div>
    </main>
  </body>
</template>

<script>
export default {
  name: "bugDetails",
  mounted() {
    this.$store.dispatch("getBugById", this.$route.params.id);
    // FIXME status does not automatically update once closed. page must be refreshed.
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
      // TODO
      //provide form to edit
      //dispatch("editBug", id, and body)
      //must also add body to fns in store
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
