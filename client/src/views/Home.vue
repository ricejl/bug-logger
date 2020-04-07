<template>
<body class="home container-fluid">
  <header class="row">
    <div class="col p-0">
      <nav class="navbar navbar-light">
        <a class="navbar-brand" href="#">
          <h3 class="bug-tracker">
            <!-- prettier-ignore-attribute -->
            B
            <i class="fas fa-bug"></i>g Tracker
          </h3>
        </a>
        <a href="#report-bug-form">
          <button
            type="button"
            class="btn btn-report my-2 my-sm-0"
            data-toggle="modal"
            data-target="#bugModal"
          >Report</button>
        </a>
      </nav>
      <!-- FIXME bug modal not working; added bookmark temporarily -->
      <!-- <bug-modal id="bugModal"></bug-modal> -->
    </div>
  </header>
  <main>
    <div class="row">
      <div class="col pt-4 text-left pl-4 pb-1">
        <h5>Current Bugs</h5>
      </div>
    </div>
    <div class="row">
      <div class="col pl-5 pr-5">
        <table class="bugs table table-striped table-dark text-left text-aliceblue">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Reported by</th>
              <th scope="col">
                Status
                <i class="fas fa-filter" @click="displayed = !displayed"></i>
              </th>
              <th scope="col">Last Modified</th>
            </tr>
          </thead>
          <tbody v-for="bug in bugs" :key="bug.id">
            <!-- FIXME add function that dynamically hides all closed bugs" -->
            <!-- SECTION rows to be vue components -->
            <bug-component :bugData="bug" v-if="displayed" />
            <!-- FIXME need to assign displayed: true to bugs !closed, normally done in data but may have to do in methods or computed if possible -->
          </tbody>
        </table>
        <!-- FIXME move report bug form to swal or modal -->
        <form @submit.prevent="reportBug" class="text-left p-5 ml-5 mr-5">
          <h5 class="text-center" id="report-bug-form">Report New Bug</h5>

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

          <button class="btn btn-green" type="submit">Submit</button>
        </form>
      </div>
    </div>
  </main>
  <footer>
    <button data-toggle="modal" data-target="#create-bug-modal">click me</button>
    <bug-modal id="create-bug-modal"></bug-modal>
  </footer>
</body>
</template>

<script>
import BugModal from "../components/BugModal";
import BugComponent from "../components/BugComponent";

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
    async reportBug() {
      let bug = { ...this.newBug };
      await this.$store.dispatch("reportBug", bug);
      this.newBug = {
        reportedBy: "",
        title: "",
        description: "",
        closed: false
        //FIXME need to reset closed to false when this was not on form input?
      };
      if (this.$store.state.activeBug.id) {
        this.$router.push({
          name: "bugDetails",
          params: { id: this.$store.state.activeBug.id }
        });
      }
    }
  },
  computed: {
    bugs() {
      return this.$store.state.bugs;
    }
  }
};
</script>

<style>
.fa-bug {
  transform: rotate(180deg);
  font-size: 0.7em;
}

body {
  background-color: #dedef0;
}

.navbar {
  background-color: #bd574e;
}

.bug-tracker {
  color: #ffad87;
}

.btn-report {
  background-color: #ffad87;
  color: var(--dark);
}

.btn-report:hover {
  background-color: var(--dark);
  color: aliceblue;
}

.btn-green {
  background-color: #9be3de;
}

.btn-green:hover {
  background-color: #46b4ad;
  color: aliceblue;
}

.text-aliceblue {
  color: aliceblue;
}
</style>
