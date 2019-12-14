<template>
  <div>
    <div v-for='task in taskList' :key='task.id'>
      <div class="card" v-if="task.category == category">
        <div><p><b>{{task.title | truncate}}</b></p></div>
        <div><p>{{task.description | truncate}}</p></div>
        <div>{{task.assignedTo | truncate}}</div>
        <button class="btn btn-secondary" data-toggle="modal" :data-target="'#mId'+task.id">
          Detail
        </button>
      </div>
      <!-- Modal -->
      <div class="modal" :id="'mId'+task.id" tabindex="-1">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{task.title}}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body text-justify">
              <div>{{task.description}}</div>
              <br>
              <div>Assigned to: {{task.assignedTo}}</div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-danger mr-auto" data-dismiss="modal" @click='deleteTask(task.id)'>Delete</button>
              <button
                v-if="task.category != 'Backlog'"
                class="btn"
                style="background-color:tomato;"
                @click="moveTo(task.id, 'Backlog')"
              >
                Backlog
              </button>
              <button
              v-if="task.category != 'Todo'"
              class="btn"
              style="background-color:yellow;"
              @click="moveTo(task.id, 'Todo')"
              >
                Todo
              </button>
              <button
              v-if="task.category != 'Ongoing'"
              class="btn"
              style="background-color:lightskyblue;"
              @click="moveTo(task.id, 'Ongoing')"
              >
                Ongoing
              </button>
              <button
              v-if="task.category != 'Finished'"
              class="btn"
              style="background-color:lightgreen;"
              @click="moveTo(task.id, 'Finished')"
              >
                Finished
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {

  name: 'Card',

  data () {
    return {
      taskList: []
    }
  },
  props: {
    category: String
  },
  filters: {
    truncate: function (text) {
      if (text.length > 30) {
        return text.slice(0, 30) + '...'
      }
      return text
    }
  },
  created () {
    this.$db
      .collection('tasks')
      .onSnapshot((querySnapshot) => {
        this.taskList = []
        querySnapshot.forEach((doc) => {
          let taskObj = {
            id: doc.id,
            ...doc.data()
          }
          this.taskList.push(taskObj)
        })
      })
  },
  methods: {
    deleteTask (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Your task will be deleted permanently!',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#3085d6',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Delete'
      })
        .then((result) => {
          if (result.value) {
            this.$db
              .collection('tasks')
              .doc(id)
              .delete()
              .then(function () {
                Swal.fire(
                  'Deleted!',
                  'Task has been deleted',
                  'success'
                )
              })
              .catch(function (error) {
                Swal.fire(
                  'Failed!',
                  'Failed to delete task',
                  'error'
                )
              })
          }
        })
    },
    moveTo (id, category) {
      this.$db
        .collection('tasks')
        .doc(id)
        .update({
          category
        })
        .catch(function (err) {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
  button{
    margin: 10px;
  }
</style>
