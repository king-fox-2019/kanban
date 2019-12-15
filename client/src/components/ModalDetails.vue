<template>
  <div>
    <b-button variant="outline-dark" v-b-modal="`details-${ task.id }`">Show Details</b-button>

    <b-modal :id="`details-${ task.id }`" :title="task.title" v-model="show" hide-footer>
      <p class="my-4">{{ task.description }}</p>
      <p>Point: {{ task.point }}</p>
      <p>Status: {{ task.status }}</p>
      <template>
        <div class="d-flex justify-content-between" v-if="task.status === 'Back-Log'">
          <b-button
            variant="danger"
            size="sm"
            @click="deleteTask"
          >
            Delete
          </b-button>
          <b-button
            variant="warning"
            size="sm"
            @click="changeStatus('To-Do')"
            class="text-white"
          >
            To-Do
          </b-button>
        </div>
        <div class="d-flex justify-content-between" v-if="task.status === 'To-Do'">
          <b-button
            variant="info"
            size="sm"
            @click="changeStatus('Back-Log')"
          >
            Back-Log
          </b-button>
          <b-button
            variant="danger"
            size="sm"
            @click="deleteTask"
          >
            Delete
          </b-button>
          <b-button
            variant="primary"
            size="sm"
            @click="changeStatus('Doing')"
          >
            Doing
          </b-button>
        </div>
        <div class="d-flex justify-content-between" v-if="task.status === 'Doing'">
          <b-button
            variant="warning"
            size="sm"
            @click="changeStatus('To-Do')"
            class="text-white"
          >
            To-Do
          </b-button>
          <b-button
            variant="danger"
            size="sm"
            @click="deleteTask"
          >
            Delete
          </b-button>
          <b-button
            variant="primary"
            size="sm"
            @click="changeStatus('Done')"
          >
            Done
          </b-button>
        </div>
        <div class="d-flex justify-content-between" v-if="task.status === 'Done'">
          <b-button
            variant="primary"
            size="sm"
            @click="changeStatus('Doing')"
          >
            Doing
          </b-button>
          <b-button
            variant="danger"
            size="sm"
            @click="deleteTask"
          >
            Delete
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import db from '../../config'
export default {
  name: 'ModalDetails',
  props: ['task'],
  data () {
    return {
      show: false
    }
  },
  methods: {
    changeStatus (newStatus) {
      db.collection('tasks').doc(this.task.id).update({
        status: newStatus
      })
      this.show = false
    },
    deleteTask () {
      this.$bvModal.msgBoxConfirm('Please confirm that you want to delete the task.', {
        title: 'Please Confirm',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
        .then(value => {
          db.collection('tasks').doc(this.task.id).delete()
          this.show = false
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
