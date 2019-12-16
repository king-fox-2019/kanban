<template>
  <div class="container">
    <div class="task-list card">
      <div :style="`background-color: ${this.color}; color: white`" class="card-header"><h2>{{this.title}}</h2></div>
      <div class="flex-column"></div>
      <task-list-item v-for="task in tasks" :key="task.id" :task="task"></task-list-item>
    </div>
  </div>
</template>

<script>
import TaskListItem from './TaskListItem'
export default {
  components: {
    TaskListItem
  },
  props: {
    tasks: Array,
    color: String,
    title: String
  }
}
</script>

<style scoped>
.task-list {
  border: 1px solid aqua;
  border-radius: 5px;
  padding: 5px;
  margin: 5px
}
</style>
