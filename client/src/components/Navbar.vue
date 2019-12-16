<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-secondary">
      <div class="container">
        <a class="navbar-brand text-white" href="#" style="font-family: 'Lilita One', cursive; font-size: 30px; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;">KANBAN</a>

        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav"></div>
        <div class="ml-auto">
          <b-button v-b-modal.modal-task class="btn" variant="danger">+ New Task</b-button>
        </div>
      </div>
    </nav>

    <b-modal id="modal-task">
      <b-form @submit.prevent="createNewTask" id="createTaskForm">
        <h3>Add New Task</h3>
        <b-form-group label="Enter title: " label-for="title">
          <b-form-input type="text" v-model="title" placeholder="enter title.." id="title" required></b-form-input>
        </b-form-group>
        <b-form-group label="Assign to: " label-for="person">
          <b-form-input type="text" v-model="assigned" placeholder="assigned to.." id="person"></b-form-input>
        </b-form-group>
        <b-form-group label="Description: " label-for="description">
          <b-form-textarea v-model="description" placeholder="description" rows="3" max-rows="6"></b-form-textarea>
        </b-form-group>
      </b-form>
      <div slot="modal-footer">
        <b-button
          variant="primary"
          type="submit"
          form="createTaskForm"
          class="btn btn-blue-grey"
        >Confirm</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Vue from 'vue'
import db from '../config/config.js'

export default {
  name: 'navbar',
  data () {
    return {
      title: '',
      description: '',
      assigned: '',
      status: 0
    }
  },
  methods: {
    createNewTask () {
      Vue.swal.fire({
        title: 'On progress: creating new task..',
        allowOutsideClick: () => !Vue.swal.isLoading()
      })
      Vue.swal.showLoading()
      let newTask = {
        title: this.title,
        description: this.description,
        assigned: this.assigned,
        status: this.status
      }
      db.collection('tasks')
        .add(newTask)
        .then(ref => {
          this.$bvModal.hide('modal-task')
          this.title = ''
          this.description = ''
          this.assigned = ''
          Vue.swal.close()
          Vue.swal.fire({
            type: 'success',
            title: 'You Have Created task !',
            showConfirmButton: false,
            timer: 1500
          })
          this.$emit('getData')
        })
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lilita+One&display=swap');
</style>
