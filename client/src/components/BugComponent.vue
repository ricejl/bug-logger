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
    <td>{{ bugData.updatedAt | formatDate }}</td>
  </tr>
</template>

<script>
export default {
  name: "bug",
  // FIXME table no longer striped--displays rows in same grey
  // FIXME format last modified with moment or use new Date to create new instance of object
  props: ["bugData"]
};
</script>

<style>
th[scope="row"] {
  font-weight: normal;
}

a th {
  color: aliceblue;
}

a:visited th {
  color: aliceblue;
}

tr a:hover {
  color: aliceblue;
  text-decoration: aliceblue underline;
}

.status-red {
  color: #fa877f;
}

.status-green {
  color: #9be3de;
}
</style>
