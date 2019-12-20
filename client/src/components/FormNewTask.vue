<template>
  <div>
    <b-form @submit.prevent="createNewTask">
      <b-form-group id="input-group-1" label="Title" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="title"
          type="text"
          required
          placeholder="Title"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Description" label-for="input-2">
        <b-form-textarea
          id="input-2"
          v-model="description"
          required
          placeholder="Description"
        ></b-form-textarea>
      </b-form-group>

      <b-form-group id="input-group-3" label="Assigned to" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="assignedTo"
          required
          placeholder="Assigned to"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Points" label-for="input-4">
        <b-form-input
          type="number"
          id="input-4"
          v-model="points"
          required
          placeholder="0"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="dark">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "FormNewTask",
  data: function() {
    return {
      title: "",
      description: "",
      assignedTo: "",
      points: "",
      status: "back-log"
    };
  },
  methods: {
    createNewTask() {
      this.$firestore
        .collection("todos")
        .add({
          title: this.title,
          description: this.description,
          assignedTo: this.assignedTo,
          points: this.points,
          status: this.status
        })
        .then(docRef => {
          this.clearData();
          this.$emit("hidingModal");
        })
        .catch(console.log);
    },
    clearData() {
      this.title = "";
      this.description = "";
      this.assignedTo = "";
      this.points = "";
      this.status = "back-log";
    }
  }
};
</script>

<style scoped></style>
