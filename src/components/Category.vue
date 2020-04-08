<template>
<div class="card">
    <div class="card-header"
    :class="{
      'bg-danger': isBacklog,
      'bg-warning': isTodo,
      'bg-primary': isDoing,
      'bg-success': isDone,
    }">
        {{ obj.name }}
    </div>
    <div class="card-body" v-for="task in filteredTasks" :key=task.id>
      <Task :task=task @task-detail=taskDetail />
    </div>
</div>
</template>

<script>
import db from '@/config/firebase.js'
import Task from '@/components/Task.vue'

export default {
  data () {
    return {
      isBacklog: null,
      isTodo: null,
      isDoing: null,
      isDone: null
    }
  },
  components: {
    Task
  },
  props: ['obj', 'categories', 'tasks'],
  methods: {
    taskDetail (value) {
      let task = {
        task: value,
        currentCategory: this.obj,
        categories: this.categories
      }
      this.$emit('task-detail', task)
    },
    assignColors () {
      switch (this.obj.id) {
        case 'backlog':
          this.isBacklog = true
          break
        case 'todo':
          this.isTodo = true
          break
        case 'doing':
          this.isDoing = true
          break
        case 'done':
          this.isDone = true
          break
      }
    }
  },
  created () {
    this.assignColors()
  },
  computed: {
    filteredTasks: function () {
      let tasks = this.tasks.filter(task => task.status == this.obj.id)
      return tasks
    }
  }
}
</script>
