<template>
  <tr>
    <router-link :to="{ name: 'bugDetails', params: { id: bugData.id }}">
      <th scope="row">{{ bugData.title }}</th>
    </router-link>
    <td>{{ bugData.reportedBy }}</td>
    <td>{{ formatStatus }}</td>
    <td>{{ formatDate }}</td>
  </tr>
</template>

<script>
export default {
  name: "bug",
  // FIXME table no longer striped--displays rows in same grey
  // FIXME need to display "open"/green when closed is false and "closed"/red when closed is true
  // FIXME format last modified with moment
  props: ["bugData"],
  computed: {
    formatStatus() {
      if (this.bugData.closed) {
        this.bugData.closed = "closed";
      } else {
        this.bugData.closed = "open";
      }
      return this.bugData.closed;
    },
    formatDate() {
      return this.bugData.updatedAt.substring(0, 10);
    }
  }
};
</script>

<style>
</style>