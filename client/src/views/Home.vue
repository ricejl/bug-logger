<template>
  <div class="home container-fluid">
    <div class="row">
      <div class="col p-0">
        <nav class="navbar navbar-light bg-light">
          <a class="navbar-brand" href="#">
            B
            <i class="fas fa-bug"></i>g Tracker
          </a>
          <button
            class="btn btn-outline-dark my-2 my-sm-0"
            data-toggle="modal"
            data-target="#reportBug"
          >Report</button>
        </nav>
      </div>
    </div>
    <div class="row">
      <div class="col pt-4 text-left pl-4 pb-1">
        <h5>Current Bugs</h5>
      </div>
    </div>
    <div class="row">
      <div class="col pl-5 pr-5">
        <table class="table table-striped table-dark text-left">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Reported by</th>
              <th scope="col">Status</th>
              <th scope="col">Last Modified</th>
            </tr>
          </thead>
          <tbody>
            <!-- SECTION rows to be vue components -->
            <tr>
              <th scope="row">Acct reactivation</th>
              <td>Mark</td>
              <td>open</td>
              <td>date</td>
            </tr>
            <tr>
              <th scope="row">Authentication</th>
              <td>Jacob</td>
              <td>open</td>
              <td>date</td>
            </tr>
            <tr>
              <th scope="row">Acct Avatar</th>
              <td>Larry</td>
              <td>closed</td>
              <td>date</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {}
};
</script>
