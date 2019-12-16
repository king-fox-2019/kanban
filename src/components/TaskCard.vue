<template>
  <section>
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
      <b-collapse
            aria-id="contentIdForA11y2"
            class="panel"
            :open.sync="isOpen">
          <div
            slot="trigger"
            class="panel-heading"
            role="button"
            aria-controls="contentIdForA11y2">
            <!-- @click="isOpen = !isOpen" -->
            {{ task.title }}
          </div>
          <div class="panel-block">
            {{ task.description }}
          </div>
          <div class="panel-block">
            Assignee: {{ task.assignee }}
          </div>
          <footer class="card-footer">
            <button class="card-footer-item button is-dark is-outlined" @click.prevent="remove(task.id)"><p id="delete">Delete</p></button>
          </footer>
      </b-collapse>

  </section>
</template>

<script>
import db from '@/assets/firestore.js'
const tasks = db.collection('tasks')

export default {
  name: 'TaskCard',
  props: {
    task: Object
  },
  data () {
    return {
      isOpen: true,
      success: '',
      error: ''
    }
  },
  methods: {
    remove (id) {
      tasks
        .doc(id)
        .delete()
        .then(() => {
          this.success = 'Task successfully deleted'
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
.card-footer {
  background-color: gainsboro
}
.panel-block {
  background-color: snow;
  text-align: left;
}
section {
  padding: 5px;
}
#delete {
  margin-top: -7px;
}
</style>
