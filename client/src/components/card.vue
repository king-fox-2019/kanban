<template>
  <div>
    <div class="mb-3" v-for="(todo,i) in todos" :key="i">
      <b-card :header="todo.title" class="text-center">
        <b-card-text>Point: {{todo.point}}</b-card-text>
        <b-card-text>Assigned To: {{todo.assignedTo}}</b-card-text>
        <b-button v-b-modal="'myModal'+todo.id" variant="outline-primary">Detail</b-button>

        <b-modal :id="'myModal'+todo.id" :title="todo.title">
          <p class="my-4">Description : {{todo.description}}</p>
          <p class="my-4">Point : {{todo.point}}</p>
          <p class="my-4">Status : {{todo.status}}</p>
          <div v-if="todo.status==='backlog'">
            <b-button variant="danger" @click="deleteTodo(todo.id)">Delete</b-button>
            <b-button variant="success" @click="update(todo.id,'todo')">To-Do</b-button>
          </div>
          <div v-if="todo.status==='todo'">
            <b-button variant="primary" @click="update(todo.id,'backlog')">Back Log</b-button>
            <b-button variant="danger" @click="deleteTodo(todo.id)">Delete</b-button>
            <b-button variant="success" @click="update(todo.id,'doing')">To-Do</b-button>
          </div>
          <div v-if="todo.status==='doing'">
            <b-button variant="primary" @click="update(todo.id,'todo')">To-Do</b-button>
            <b-button variant="danger" @click="deleteTodo(todo.id)">Delete</b-button>
            <b-button variant="success" @click="update(todo.id,'done')">Done</b-button>
          </div>
          <div v-if="todo.status==='done'">
            <b-button variant="primary" @click="update(todo.id,'doing')">Doing</b-button>
            <b-button variant="danger" @click="deleteTodo(todo.id)">Delete</b-button>
          </div>
        </b-modal>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todos: {
      type: Array
    }
  },
  methods: {
    deleteTodo(id) {
      this.$bvModal.hide("myModal" + id);
      this.$db
        .collection("Todos")
        .doc(id)
        .delete()
        .then(function() {
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
    },
    update(id, status) {
      this.$bvModal.hide("myModal" + id);
      this.$db.collection('Todos').doc(id)
        .update({
          status: status
        })
        .then(function() {
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    }
  }
};
</script>

<style>
</style>