<template>
  <div>
    <!-- <div id="nav"> -->
      <b-navbar toggleable="lg" type="light" class="nav mb-4">
        <b-navbar-brand style="color: white" class="mb-4">カンバン</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-b-modal.modalTask>
            <p style="color:white; font-weight:bold;" class="mb-4">
              <i class="fas fa-feather-alt"></i>
            </p>
          </b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    <!-- </div> -->
    <b-modal
      id="modalTask"
      title="Add new tasks"
      ref="modal"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <b-form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group label="Title" label-for="title-input">
          <b-form-input id="title-input" v-model="taskName" placeholder="Task title"></b-form-input>
        </b-form-group>
        <b-form-group label="Description" label-for="desc-input">
          <b-form-textarea
            id="desc-input"
            v-model="description"
            placeholder="Task description..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>
        <b-form-group label="Assign To" label-for="assign-input">
          <b-form-input id="assign-input" v-model="assignedTo" placeholder="Assigned to"></b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
// import Swal from 'sweetalert2'
import db from '../../config/firebase'

export default {
  name: 'Navbar',
  data () {
    return {
      taskName: '',
      description: '',
      assignedTo: ''
    }
  },
  methods: {
    deleteTask (id) {
      db.collection('tasks')
        .doc(id)
        .delete()
    },
    resetModal () {
      this.taskName = ''
      this.description = ''
      this.assignedTo = ''
    },
    handleOk (bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },
    handleSubmit () {
      db.collection('tasks')
        .add({
          taskName: this.taskName,
          description: this.description,
          assignedTo: this.assignedTo,
          status: 'backlog'
        })
        .then(docRef => {
          this.$nextTick(() => {
            this.$refs.modal.hide()
          })
        })
        .catch(error => {
          console.error('Error adding task: ', error)
          this.$nextTic(() => {
            this.$refs.modal.hide()
          })
        })
    }
  }
}
</script>

<style>
.nav {
  background-color: rgba(80, 212, 168, 0.856);
  height: 50px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f3f3f3;
}
</style>
