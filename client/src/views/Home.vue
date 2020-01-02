<template>
  <div class="home container-fluid">
    <div class="row">
      <div class="col p-0">
        <nav class="navbar navbar-light bg-light">
          <a class="navbar-brand" href="#">
            <h3>
              <!-- prettier-ignore-attribute -->
              B
              <i class="fas fa-bug"></i>g Tracker
            </h3>
          </a>
          <button
            type="button"
            class="btn btn-outline-dark my-2 my-sm-0"
            data-toggle="modal"
            data-target="#bugModal"
          >
            Report
          </button>
        </nav>
        <bug-modal id="bugModal"></bug-modal>
      </div>
    </div>
    <div class="row">
      <div class="col pt-4 text-left pl-4 pb-1">
        <h5>Current Bugs</h5>
      </div>
    </div>
    <div class="row">
      <div class="col pl-5 pr-5">
        <table class="bugs table table-striped table-dark text-left">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Reported by</th>
              <th scope="col">Status</th>
              <th scope="col">Last Modified</th>
            </tr>
          </thead>
          <tbody v-for="bug in bugs" :key="bug.id">
            <!-- SECTION rows to be vue components -->
            <bug-component :bugData="bug" />
          </tbody>
        </table>
        <!-- FIXME move report bug form to swal -->
        <!-- FIXME navigate to BugDetails upon submit -->
        <form @submit.prevent="reportBug" class="text-left">
          <div class="form-group">
            <label for="reportedBy">Reported by</label>
            <input
              type="text"
              v-model="newBug.reportedBy"
              id="reportedBy"
              class="form-control"
              placeholder="Your name..."
              required
            />
          </div>
          <div class="form-group">
            <label for="title">Bug title</label>
            <input
              type="text"
              v-model="newBug.title"
              id="title"
              class="form-control"
              placeholder="Bug title..."
              required
            />
          </div>

          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              name="description"
              v-model="newBug.description"
              id="description"
              class="form-control"
              cols="1"
              rows="8"
              placeholder="Describe the bug..."
              required
            ></textarea>
          </div>

          <button class="btn btn-success" type="submit">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import BugModal from "../components/BugModal";
import BugComponent from "../components/BugComponent";
// @ is an alias to /src

export default {
  name: "home",
  mounted() {
    this.$store.dispatch("getBugs");
  },
  data() {
    return {
      newBug: {
        reportedBy: "",
        title: "",
        description: "",
        closed: false
      }
    };
  },
  components: {
    BugModal,
    BugComponent
  },
  methods: {
    reportBug() {
      let bug = { ...this.newBug };
      this.$store.dispatch("reportBug", bug);
      this.newBug = {
        reportedBy: "",
        title: "",
        description: "",
        closed: false
        //TODO need to reset closed to false when this was not on form input?
      };
    }
  },
  computed: {
    bugs() {
      return this.$store.state.bugs;
    }
  }
};
</script>

<style scoped>
.fa-bug {
  transform: rotate(180deg);
  font-size: 0.7em;
}
</style>
