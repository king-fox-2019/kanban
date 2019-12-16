<template>
    <div class="modal fade" tabindex="-1" role="dialog" id="showDetail">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Detail</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body text-left">
                    <form class="text-left">
                        <div class="form-group">
                            <label for="title">Title</label>
                            <input readonly v-model="title" type="text" class="form-control form-control-sm" id="inputTitle" aria-describedby="emailHelp" placeholder="Title">
                        </div>
                        <div class="form-group">
                            <label for="content">Content</label>
                            <textarea readonly v-model="content" type="text" class="form-control form-control-sm" id="inputContent" placeholder="Content"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="point">Point</label>
                            <input readonly v-model="point" type="number" class="form-control form-control-sm" id="inputPoint" value="0">
                        </div>
                        <div class="form-group">
                            <label for="assignedto">Assigned To</label>
                            <input readonly v-model="assignedto" type="text" class="form-control form-control-sm" id="inputAssignedto" placeholder="Assigned To">
                        </div>
                        <div>
                            <div v-if="status === 'backlog'" class="d-flex justify-content-between">
                                <button type="button" class="btn btn-danger" v-on:click.prevent="deleteTask()" data-dismiss="modal" aria-label="Close">Delete</button>
                                <button type="submit" class="btn btn-success" v-on:click.prevent="goTodo()" data-dismiss="modal" aria-label="Close">Todo</button>
                            </div>
                            <div v-if="status === 'todo'" class="d-flex justify-content-between">
                                <button type="button" class="btn btn-warning" v-on:click.prevent="goBacklog()" data-dismiss="modal" aria-label="Close">Back Log</button>
                                <button type="button" class="btn btn-danger" v-on:click.prevent="deleteTask()" data-dismiss="modal" aria-label="Close">Delete</button>
                                <button type="button" class="btn btn-success" v-on:click.prevent="goDoing()" data-dismiss="modal" aria-label="Close">Doing</button>
                            </div>
                            <div v-if="status === 'doing'" class="d-flex justify-content-between">
                                <button type="button" class="btn btn-warning" v-on:click.prevent="goTodo()" data-dismiss="modal" aria-label="Close">Todo</button>
                                <button type="button" class="btn btn-danger" v-on:click.prevent="deleteTask()" data-dismiss="modal" aria-label="Close">Delete</button>
                                <button type="button" class="btn btn-success" v-on:click.prevent="goDone()" data-dismiss="modal" aria-label="Close">Done</button>
                            </div>
                            <div v-if="status === 'done'" class="d-flex justify-content-between">
                                <button type="button" class="btn btn-warning" v-on:click.prevent="goDoing()" data-dismiss="modal" aria-label="Close">Doing</button>
                                <button type="button" class="btn btn-danger" v-on:click.prevent="deleteTask()" data-dismiss="modal" aria-label="Close">Delete</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import db from '../../config/firestore'

export default {
  props: ['show-detail'],
  data () {
    return {
      title: '',
      content: '',
      point: null,
      assignedto: '',
      status: '',
      currentTaskId: ''
    }
  },
  methods: {
    goBacklog () {
      let backlogRef = db.collection('Task').doc(this.currentTaskId)
      backlogRef.update({ status: 'backlog' })
        .then(function () {
          console.log('Update Success!')
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    goTodo () {
      let todoRef = db.collection('Task').doc(this.currentTaskId)
      todoRef.update({ status: 'todo' })
        .then(function () {
          console.log('Update Success')
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    goDoing () {
      let doingRef = db.collection('Task').doc(this.currentTaskId)
      doingRef.update({ status: 'doing' })
        .then(function () {
          console.log('Update Success!')
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    goDone () {
      let doneRef = db.collection('Task').doc(this.currentTaskId)
      doneRef.update({ status: 'done' })
        .then(function () {
          console.log('Update Success')
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    deleteTask () {
      db.collection('Task').doc(this.currentTaskId).delete().then(function () {
        console.log('Document successfully deleted!')
      }).catch(function (error) {
        console.error('Error removing document: ', error)
      })
    }
  },
  watch: {
    showDetail (val) {
      this.currentTaskId = val.id
      this.title = val.title
      this.content = val.content
      this.point = val.point
      this.assignedto = val.assigned_to
      this.status = val.status
    }
  }

}
</script>

<style>

</style>
