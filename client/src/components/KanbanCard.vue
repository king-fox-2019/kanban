<template>
    <div>
        <div class="p-2">
            <b-card-group deck>
                <b-card class="font-weight-bold" id="CardBody" :header="task.taskName">
                    <p class="font-weight-normal">Description: {{ task.description }}</p>
                    <p class="font-weight-normal">Assigned To: {{ task.assignedTo }}</p>
                    <div class="delButton">
                      <b-button pill variant="outline-danger" @click="deleteTask">✕</b-button>
                    </div>
                </b-card>
            </b-card-group>
        </div>
    </div>
</template>

<script>
export default {
  name: 'KanbanCard',
  props: ['task'],
  methods: {
    deleteTask () {
      this.$emit('delete-task', this.task.id)
    }
  }
}
</script>

<style>
#CardBody {
  background-image: url('../assets/notebook-paper-background.jpeg') !important;
  background-position: 20% 20%;
}
.card {
  background-image: url('../assets/ancient-paper.jpg');
}
.delButton {
  display: flex;
  justify-content: center;
}
</style>
