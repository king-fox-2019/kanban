<template>
    <div class="d-flex justify-content-between p-3">
        <h3>Kanban</h3>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#newTask">
            New Task
        </button>
        <div class="modal fade" id="newTask" tabindex="-1" role="dialog" aria-labelledby="newTaskLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">New Task</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label for="inputTitle">Title</label>
                                <input type="text" class="form-control" id="inputTitle" aria-describedby="titleHelp" placeholder="Task Title" v-model="title">
                            </div>
                            <div class="form-group">
                                <label for="inputDescription">Description</label>
                                <textarea class="form-control" id="inputDescription" placeholder="Task Short Description" v-model="description"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="inputPoint">Point</label>
                                <input type="text" class="form-control" id="inputPoint" placeholder="Task Point" v-model="point">
                            </div>
                            <div class="form-group">
                                <label for="inputAssign">Assigned To</label>
                                <input type="text" class="form-control" id="inputAssign" placeholder="Assigned To" v-model="assignTo">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary" @click.prevent="addTask" data-dismiss="modal">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import db from '@/config/firebase.js'

export default {
  data () {
    return {
      title: '',
      description: '',
      point: 0,
      assignTo: ''
    }
  },
  methods: {
    addTask () {
      db.collection('tasks').add({
        title: this.title,
        description: this.description,
        point: this.point,
        assignTo: this.assignTo,
        status: 'backlog'
      }).then(ref => {
        console.log('Added document with ID: ', ref.id)
      })
    }
  }
}
</script>
