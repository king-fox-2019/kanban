<template>
  <div class="card mb-4 hoverable mx-2" style="width: 16rem; border: 1px solid gray">
    <h5 class="card-header">{{item.title}}</h5>
    <div class="card-body">
      <p class="card-text" style="font-size:15px">{{item.description}}</p>
      <small class="card-text">Assigned To : {{item.assigned}}</small>
      <br>
      <br>
      <div class="card-footer" style="display:flex;justify-content:center;">
        <button v-if="item.status!=0" @click="previousTask(item)" style="color:black;" class="btn btn-blue-grey btn-sm p-1">Prev</button>
        <button class="btn btn-blue-grey btn-sm p-1" style="color:black;" @click=deleteTask(item.id)>Delete</button>
        <button v-if="item.status!=3" @click="nextTask(item)" class="btn btn-blue-grey btn-sm p-1" style="color:black;">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import db from '../config/config.js'

export default {
  name: 'Task',
  props: {
    item: Object,
    name: String
  },
  methods: {
    deleteTask (id) {
      console.log('28')
      Vue.swal.fire({
        title: 'Confirm',
        text: 'Are you sure to delete this task ?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
        .then(result => {
          if (result.value) {
            db.collection('tasks').doc(id).delete()
              .then(success => {
                Vue.swal.fire({
                  type: 'success',
                  title: 'Successfully deleted task',
                  showConfirmButton: false,
                  timer: 1500
                })
                this.$emit('getData')
              })
              .catch(err => {
                console.log(err)
              })
          }
        })
    },
    nextTask (task) {
      let id = task.id
      let status = task.status
      if (status <= 4) {
        status += 1
      }
      db.collection('tasks').doc(id)
        .update({ status })
        .then(() => {
          this.$emit('getData')
        })
    },
    previousTask (task) {
      let id = task.id
      let status = task.status
      if (status > 0) {
        status -= 1
      }
      db.collection('tasks').doc(id)
        .update({ status })
        .then(() => {
          this.$emit('getData')
        })
    }
  }
}
</script>

<style>
</style>
