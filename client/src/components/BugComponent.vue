<template>
  <tr>
    <router-link :to="{ name: 'bugDetails', params: { id: bugData.id } }">
      <th scope="row">{{ bugData.title }}</th>
    </router-link>
    <td>{{ bugData.reportedBy }}</td>
    <div v-if="bugData.closed === true">
      <td class="status-red">closed</td>
    </div>
    <div v-else>
      <td class="status-green">open</td>
    </div>
    <td>{{ formatDate }}</td>
  </tr>
</template>

<script>
export default {
  name: "bug",
  // FIXME table no longer striped--displays rows in same grey
  // FIXME format last modified with moment or use new Date to create new instance of object
  props: ["bugData"],
  computed: {
    formatDate() {
      return this.bugData.updatedAt.substring(0, 10);
    }
  }
};
</script>

<style>
th[scope="row"] {
  font-weight: normal;
}

a th {
  color: white;
}

a:visited th {
  color: white;
}

a:hover th {
  color: white;
  /* text-decoration: none; */
}

.status-red {
  color: red;
}

.status-green {
  color: green;
}
</style>
