<template>
  <b-button-group size="sm">
    <b-button
      variant="warning"
      v-if="status === 'todo'"
      @click="updateStatus('back-log')"
      >Left</b-button
    >
    <b-button
      variant="info"
      v-if="status === 'doing'"
      @click="updateStatus('todo')"
      >Left</b-button
    >
    <b-button
      variant="primary"
      v-if="status === 'done'"
      @click="updateStatus('doing')"
      >Left</b-button
    >

    <b-button variant="danger" @click="deleteTodo">Delete</b-button>

    <b-button
      variant="info"
      v-if="status === 'back-log'"
      @click="updateStatus('todo')"
      >Right</b-button
    >
    <b-button
      variant="primary"
      v-if="status === 'todo'"
      @click="updateStatus('doing')"
      >Right</b-button
    >
    <b-button
      variant="success"
      v-if="status === 'doing'"
      @click="updateStatus('done')"
      >Right</b-button
    >
  </b-button-group>
</template>

<script>
export default {
  name: "UpdateButton",
  props: ["todoId", "status"],
  methods: {
    updateStatus(status) {
      this.$firestore
        .collection("todos")
        .doc(this.todoId)
        .update({
          status
        })
        .then(function() {
          console.log("success update data");
        })
        .catch(console.log);
    },
    deleteTodo() {
      this.$firestore
        .collection("todos")
        .doc(this.todoId)
        .delete()
        .then(function() {
          console.log("success delete todo");
        })
        .catch(console.log);
    }
  }
};
</script>

<style scoped></style>
