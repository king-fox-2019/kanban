<template>

  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn class="add-task-btn" v-on="on" text>
        <span class="mr-2">Start assigning task</span>
        <v-icon>mdi-cursor-default-click</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="mb-2">
        <span class="headline">Add a new task</span>
      </v-card-title>

      <v-col class="mb-2" cols="12">
        <v-text-field v-model="title" label="Title" outlined dense hide-details></v-text-field>
      </v-col>

      <v-col class="mb-2" cols="12">
        <v-textarea v-model="description" outlined name="input-7-4" label="Description" value hide-details></v-textarea>
      </v-col>

      <v-col class="mb-2" cols="12">
        <v-text-field v-model="assignTo" label="Assign to:" outlined hide-details></v-text-field>
      </v-col>

      <v-card-actions class="buttons">
        <v-btn color="blue darken-1" text @click="addTask">Submit</v-btn>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script>
export default {
  name: 'form-add-task',

  data: () => ({
    title: '',
    description: '',
    point: '',
    assignTo: '',
    dialog: false
  }),

  methods: {
    addTask: function () {
      const payload = {
        title: this.title,
        description: this.description,
        assignTo: this.assignTo
      }
      this.$emit('add-task', payload)
      this.dialog = false
    }
  }
}
</script>

<style>
  .add-task-btn {
    margin: 1% 0 1% 0;
  }

  .buttons {
    padding-top: 10px !important;
    padding-left: 20px !important;
    padding-bottom: 20px !important;
  }
</style>
