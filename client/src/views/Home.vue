<template>
  <div class="home">
    <!-- <h1>KANBAN BOARD</h1> -->
    <button class="btn btn-primary" data-toggle="modal" data-target="#addTask" style="margin:30px;">
      Add Task
    </button>
    <div class="modal" id="addTask" tabindex="-1">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Add Task</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body text-justify">
              <form>
                <div class="form-group">
                  <label for="title" >Title</label>
                  <input type="text" v-model="title" class="form-control" placeholder="Enter title">
                </div>
                <div class="form-group">
                  <label for="description" >Description</label>
                  <textarea type="text" v-model="description" class="form-control" placeholder="Enter description"></textarea>
                </div>
                <div class="form-group">
                  <label for="assignedTo">Assigned to</label>
                  <input type="text" v-model="assignedTo" class="form-control" placeholder="Enter the assigned person">
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button data-dismiss="modal" class="btn btn-primary" @click='submitTask'>Add</button>
            </div>
          </div>
        </div>
      </div>
    <Board />
    <Card />
  </div>
</template>

<script>
// @ is an alias to /src
import Board from '@/components/Board.vue'
import Card from '@/components/Card.vue'
import Swal from 'sweetalert2'

export default {
  name: 'Home',
  components: {
    Board,
    Card
  },
  data () {
    return {
      title: '',
      description: '',
      assignedTo: ''
    }
  },
  methods: {
    submitTask () {
      this.$db
        .collection('tasks')
        .add({
          title: this.title,
          description: this.description,
          assignedTo: this.assignedTo,
          category: 'Backlog'
        })
        .then((docRef) => {
          this.title = ''
          this.description = ''
          this.assignedTo = ''
          Swal.fire(
            'Success!',
            'Task added to database',
            'success'
          )
        })
        .catch(function (error) {
          Swal.fire(
            'Error!',
            'Failed to add task',
            'error'
          )
        })
    }
  }
}
</script>

<style scoped>
  h1{
    text-align: center;
  }
</style>
