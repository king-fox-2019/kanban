<template>
  <div class="home">
    <MainHeader></MainHeader>
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
    <div class="columns">
      <div class="column" id="blue">
        <p class="title is-3 is-spaced">Back-Log</p>
          <draggable class="list-group" :list="backlog" group="kanban">
            <task-card
              class="list-group-item"
              v-for="task in backlog" :key="task.id" :task="task"
            >
            </task-card>
          </draggable>
      </div>
      <div class="column" id="red">
        <p class="title is-3 is-spaced">To-Do</p>
      <draggable class="list-group" :list="todo" group="kanban">
        <task-card
          class="list-group-item"
          v-for="task in todo" :key="task.id" :task="task"
        >
        </task-card>
      </draggable>
      </div>
      <div class="column" id="yellow">
        <p class="title is-3 is-spaced">On-Going</p>
      <draggable class="list-group" :list="ongoing" group="kanban">
        <task-card
          class="list-group-item"
          v-for="task in ongoing" :key="task.id" :task="task"
        >
        </task-card>
      </draggable>
      </div>
      <div class="column" id="green">
        <p class="title is-3 is-spaced">Finished</p>
      <draggable class="list-group" :list="finished" group="kanban">
        <task-card
          class="list-group-item"
          v-for="task in finished" :key="task.id" :task="task"
        >
        </task-card>
      </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader.vue'
import draggable from 'vuedraggable'
import TaskCard from '@/components/TaskCard.vue'
import db from '@/assets/firestore.js'
const tasks = db.collection('tasks')

export default {
  name: 'home',
  data: function () {
    return {
      backlog: [],
      todo: [],
      ongoing: [],
      finished: [],
      success: '',
      error: ''
    }
  },
  watch: {
    backlog: {
      handler: function () {
        for (let list of this.backlog) {
          if (list.category !== 'Back-Log') {
            tasks
              .doc(list.id)
              .update({
                category: 'Back-Log'
              })
              .then(() => {
                this.success = 'Task successfully updated'
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
      },
      deep: true
    },
    todo: {
      handler: function () {
        for (let list of this.todo) {
          if (list.category !== 'To-Do') {
            tasks
              .doc(list.id)
              .update({
                category: 'To-Do'
              })
              .then(() => {
                this.success = 'Task successfully updated'
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
      },
      deep: true
    },
    ongoing: {
      handler: function () {
        for (let list of this.ongoing) {
          if (list.category !== 'On-Going') {
            tasks
              .doc(list.id)
              .update({
                category: 'On-Going'
              })
              .then(() => {
                this.success = 'Task successfully updated'
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
      },
      deep: true
    },
    finished: {
      handler: function () {
        for (let list of this.finished) {
          if (list.category !== 'Finished') {
            tasks
              .doc(list.id)
              .update({
                category: 'Finished'
              })
              .then(() => {
                this.success = 'Task successfully updated'
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
      },
      deep: true
    }
  },
  created () {
    tasks.onSnapshot(snapshot => {
      this.backlog = []
      this.todo = []
      this.ongoing = []
      this.finished = []
      snapshot.forEach(obj => {
        const id = obj.id
        const data = obj.data()
        const createdAt = new Date()
        if (data.category === 'Back-Log') {
          this.backlog.push({
            id,
            title: data.title,
            description: data.description,
            assignee: data.assignee,
            category: data.category,
            createdAt
          })
        } else if (data.category === 'To-Do') {
          this.todo.push({
            id,
            title: data.title,
            description: data.description,
            assignee: data.assignee,
            category: data.category,
            createdAt
          })
        } else if (data.category === 'On-Going') {
          this.ongoing.push({
            id,
            title: data.title,
            description: data.description,
            assignee: data.assignee,
            category: data.category,
            createdAt
          })
        } else if (data.category === 'Finished') {
          this.finished.push({
            id,
            title: data.title,
            description: data.description,
            assignee: data.assignee,
            category: data.category,
            createdAt
          })
        }
      })
    })
  },
  components: {
    MainHeader,
    draggable,
    TaskCard
  }
}
</script>

<style scoped>
  .columns {
    margin: 7px;
  }
  .column {
    margin: 5px;
    border-radius: 7px;
  }
  #red {
    background-color: hsl(348, 100%, 61%)
  }
  #blue {
    background-color: hsl(204, 86%, 53%)
  }
  #green {
    background-color: hsl(171, 100%, 41%)
  }
  #yellow {
    background-color: hsl(48, 100%, 67%)
  }
</style>
