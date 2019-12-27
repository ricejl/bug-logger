<template>
<body class="container-fluid">
  <header class="row">
    <div class="col p-0">
      <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand" href="#">
          <router-link :to="{ name: 'home'}">
            <h3>
              <!-- prettier-ignore-attribute -->
              B
              <i class="fas fa-bug"></i>g Tracker
            </h3>
          </router-link>
        </a>
        <button
          type="button"
          class="btn btn-outline-dark my-2 my-sm-0"
          data-toggle="modal"
          data-target="#bugModal"
        >Report</button>
      </nav>
    </div>
  </header>
  <main class="row">
    <div class="col">
      <h5 class="pt-4 pb-2">Title: {{ bug.title }}</h5>
      <p class="pb-1" id="reported-by">Reported by: {{ bug.reportedBy }}</p>
      <p id="status">Status: {{ formatStatus }}</p>
      <p class="border rounded p-3">{{ bug.description }}</p>
      <button class="btn btn-danger" @click="closeBug">Close</button>
      <!-- TODO add sweetalert to confirm close -->
      <!-- TODO add edit fn -->
      <!-- TODO add notes that can be added or removed; must create fxns server side -->
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
      this.$store.dispatch("deleteBug", this.$route.params.id);
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