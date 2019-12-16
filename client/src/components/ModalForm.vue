<template>
<div>
  <b-button
    v-b-modal.kanban-form
    variant="outline-primary"
  >Create New Task
  </b-button>
    <b-modal
      id="kanban-form"
      ref="modal"
      title="Create New Task"
      v-model="show"
    >
    <form @submit.prevent="createTask">
      <b-form-group
        label="Title"
        label-for="title-input"
        invalid-feedback="Title is required"
      >
        <b-form-input
          id="title-input"
          v-model="title"
          placeholder="Title"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Description"
        label-for="description-input"
        invalid-feedback="Description is required"
      >
        <b-form-textarea
          id="description-input"
          placeholder="Enter task description"
          v-model="description"
          required
        ></b-form-textarea>
      </b-form-group>

      <b-form-group
        label="Point"
        label-for="point-input"
        invalid-feedback="Point is required"
      >
        <b-form-input
          id="point-input"
          v-model="point"
          type="number"
          min="0"
          placeholder="Point"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Assignee"
        label-for="assignee-input"
        invalid-feedback="Assignment is required"
      >
        <b-form-input
          id="assignee-input"
          v-model="assignee"
          placeholder="To whom the task is assigned to"
          required
        ></b-form-input>

      </b-form-group>

      <b-form-group
        label="Status"
        label-for="status-input"
      >
        <b-form-select
          id="status-input"
          placeholder="Status"
          v-model="status"
          :options="statusOptions"
        ></b-form-select>
      </b-form-group>
    </form>
    <template v-slot:modal-footer>
      <div class="w-100">
        <b-button
          variant="primary"
          size="sm"
          class="float-right"
          @click="createTask"
        >
          Submit
        </b-button>
      </div>
    </template>
  </b-modal>
</div>
</template>

<script>
import db from '../../config'
export default {
  name: 'ModalForm',
  props: ['editor'],
  data () {
    return {
      show: false,
      title: '',
      description: '',
      point: 0,
      assignee: '',
      status: '',
      statusOptions: [
        'Back-Log',
        'To-Do',
        'Doing',
        'Done'
      ]
    }
  },
  methods: {
    createTask () {
      this.show = false
      db.collection('tasks').add({
        title: this.title,
        description: this.description,
        point: this.point,
        assignee: this.assignee,
        status: this.status
      })
      this.title = ''
      this.description = ''
      this.point = 0
      this.assignee = ''
      this.status = ''
    }
  },
  mounted () {
    if (this.editor === 'edit') {
    }
  }
}
</script>

<style>

</style>
