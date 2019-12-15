<template>
<div>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <img src="../assets/kanban.png" width="200" height="100">
  </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <button class="button" @click="open">
          Add Task</button>
      </div>
    </div>
  </nav>
  <article v-if="success" class="message is-success">
    <div class="message-header">
      <p>Success</p>
      <button class="delete" aria-label="delete"></button>
    </div>
    <div class="message-body">
      {{ success }}
    </div>
  </article>
  <article v-if="error" class="message is-danger">
    <div class="message-header">
      <p>Error</p>
      <button class="delete" aria-label="delete"></button>
    </div>
    <div class="message-body">
      {{ error }}
    </div>
  </article>
  <div :class="this.class" id="modal-box">
    <section class="modal-card-body">
      <button class="delete" aria-label="close"
      @click="close"></button>
      <div class="field">
        <label class="label">Task</label>
        <div class="control">
          <input class="input" type="text" placeholder="Input task title here.." v-model="title">
        </div>
      </div>
      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <textarea class="textarea" placeholder="Input task description here.." v-model="description"></textarea>
        </div>
      </div>
      <div class="field">
        <label class="label">Assignee</label>
        <div class="control">
          <input class="input" type="text" placeholder="Input asignee here.." v-model="assignee">
        </div>
      </div>
      <div class="field">
        <label class="label">Category</label>
        <div class="control has-icons-left">
          <div class="select">
            <select v-model="category">
              <option>Back-Log</option>
              <option>To-Do</option>
              <option>On-Going</option>
              <option>Finished</option>
            </select>
          </div>
          <span class="icon is-left">
            <i class="fa fa-list-alt" aria-hidden="true"></i>
          </span>
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link" @click.prevent="addTask">Submit</button>
        </div>
        <div class="control">
          <button class="button is-link is-light">Clear</button>
        </div>
      </div>
      </section>
    </div>
  </div>
</template>

<script>
import firebase from '@/assets/firebase.js'
import db from '@/assets/firestore.js'
const tasks = db.collection('tasks')

export default {
  name: 'MainHeader',
  data: function () {
    return {
      class: 'modal',
      title: '',
      description: '',
      category: '',
      assignee: '',
      success: '',
      error: ''
    }
  },
  methods: {
    open: function () {
      this.class = 'modal is-active'
    },
    close: function () {
      this.class = 'modal'
    },
    addTask: function () {
      tasks
        .add({
          title: this.title,
          description: this.description,
          assignee: this.assignee,
          category: this.category,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(result => {
          this.success = 'Task successfully added'
          this.title = ''
          this.description = ''
          this.assignee = ''
          this.category = ''
        })
        .catch(err => {
          this.error = err
        })
        .finally(() => {
          this.success = ''
          this.error = ''
        })
    }
  }
}
</script>

<style scoped>
#modal-box {
  background-color: rgba(0, 0, 0, 0.5)
}
.navbar {
  padding: 0px;
  margin: 0px;
}
</style>
