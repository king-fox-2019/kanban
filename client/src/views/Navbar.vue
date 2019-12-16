<template>
<div>
  <b-navbar toggleable="lg">
    <b-navbar-brand class="ml-5" href="#" variant="info" style="font-weight: bold; color:#A1A9B1; font-size:25px;">KanBan Board</b-navbar-brand>
      <!-- Right aligned nav items -->
    <b-button v-b-modal.modal-prevent-closing class="ml-auto mr-3" variant="primary" size="sm">New Task</b-button>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="New Task"
      @ok="createKanban"
      centered
    >
      <form ref="form">
        <b-form-group
          label="Title"
          label-for="name-input"
          invalid-feedback="Title is required"
        >
          <b-form-input
            v-model="kanbarForm.title"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Description"
          label-for="name-input"
          invalid-feedback="description is required"
        >
          <b-form-textarea
            v-model="kanbarForm.description"
            required
          ></b-form-textarea>
        </b-form-group>
        <b-form-group
          label="Point"
          label-for="name-input"
          invalid-feedback="Point is required"
        >
          <b-form-input
            type="number"
            v-model="kanbarForm.point"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Assigned To."
          label-for="name-input"
          invalid-feedback="Assigned is required"
        >
          <b-form-input
            v-model="kanbarForm.assigne"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
    <div>
  </div>
  </b-navbar>
</div>
</template>

<script>
import Swal from 'sweetalert2'
// import Swal from 'sweetalert2/dist/sweetalert2.js'
import db from '../config/firebase'
export default {
  data () {
    return {
      kanbarForm: {
        title: '',
        description: '',
        assigne: '',
        point: '',
        status: 'backlog'
      }
    }
  },
  methods: {
    createKanban () {
      if (!this.kanbarForm.title || !this.kanbarForm.description || !this.kanbarForm.assigne || !this.kanbarForm.point) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'error',
          title: 'all input is required!'
        })
      } else {
        Swal.fire({
          title: 'Sweet!',
          text: 'Modal with a custom image.',
          imageUrl: 'https://media.tenor.com/images/cb6d589d6aab1502d1a858735925510b/tenor.gif',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image'
        })
        db.collection('kanbanList')
          .add(this.kanbarForm)
          .then((docRef) => {
            this.$dlg.toast('Created Successfully!', { messageType: 'success', closeTime: 2 })
            Swal.close()
            this.kanbarForm.title = ''
            this.kanbarForm.description = ''
            this.kanbarForm.assigne = ''
            this.kanbarForm.point = ''
          })
          .catch(err => {
            this.$dlg.toast('eerrr! ' + err, { messageType: 'error' })
            Swal.close()
          })
      }
    }
  }
}
</script>

<style>

</style>
