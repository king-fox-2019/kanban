<template>
    <div>
        <nav class="navbar navbar-light bg-light">
            <a class="navbar-brand">Navbar</a>
            <button class="btn btn-outline-success my-2 my-sm-0" type="button" data-toggle="modal" data-target="#addNewTask">New Task</button>
        </nav>
        <div class="modal fade" tabindex="-1" role="dialog" id="addNewTask">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Add new task</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form class="text-left">
                            <div class="form-group">
                                <label for="title">Title</label>
                                <input v-model="title" type="text" class="form-control form-control-sm" id="inputTitle" aria-describedby="emailHelp" placeholder="Title">
                            </div>
                            <div class="form-group">
                                <label for="content">Content</label>
                                <textarea v-model="content" type="text" class="form-control form-control-sm" id="inputContent" placeholder="Content"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="point">Point</label>
                                <input v-model="point" type="number" class="form-control form-control-sm" id="inputPoint" value="0">
                            </div>
                            <div class="form-group">
                                <label for="assignedto">Assigned To</label>
                                <input v-model="assignedto" type="text" class="form-control form-control-sm" id="inputAssignedto" placeholder="Assigned To">
                            </div>
                            <button v-on:click.prevent="addNewTask" type="button" class="btn btn-primary" data-dismiss="modal" aria-label="Close">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import db from '../../config/firestore'

export default {
  data () {
    return {
      title: '',
      content: '',
      point: 0,
      assignedto: ''
    }
  },
  methods: {
    addNewTask () {
      db.collection('Task').add({
        title: this.title,
        content: this.content,
        point: this.point,
        assigned_to: this.assignedto,
        status: 'backlog'
      })
        .then((docRef) => {
          this.title = ''
          this.content = ''
          this.point = ''
          this.assignedto = ''
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
