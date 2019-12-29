<template>
  <tr>
    <td>{{ noteData.reportedBy }}</td>
    <td>{{ noteData.content }}</td>
    <td><i class="far fa-trash-alt"></i></td>
  </tr>
</template>

<script>
export default {
  name: "note",
  props: ["noteData"]
};
</script>

<style></style>
