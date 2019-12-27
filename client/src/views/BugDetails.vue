<template>
<body class="container-fluid">
  <header class="row">
    <div class="col">
      <!-- navbar -->
    </div>
  </header>
  <main class="row">
    <div class="col">{{ bug }}</div>
  </main>
</body>
</template>

<script>
export default {
  name: "bugDetails",
  mounted() {
    this.$store.dispatch("getBugById", this.$route.params.id);
  },
  computed: {
    bug() {
      return this.$store.state.activeBug;
    }
  }
};
</script>

<style>
</style>