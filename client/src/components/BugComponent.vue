<template>
  <tr>
    <th scope="row">{{ bugData.title }}</th>
    <td>{{ bugData.reportedBy }}</td>
    <td>{{bugData.closed}}</td>
    <td>{{bugData.updatedAt}}</td>
  </tr>
</template>

<script>
export default {
  name: "bug",
  //   FIXME table no longer striped--displays rows in same grey
  // FIXME need to display "open"/green when closed is false and "closed"/red when closed is true
  // FIXME format last modified
  props: ["bugData"]
};
</script>

<style>
</style>