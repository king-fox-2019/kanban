<template>
    <div class="mt-5">
        <div class="card">
            <div class="card-header" v-bind:style="{background: activeColor}">
                {{ header }}
            </div>
            <div v-for="task in taskData" :key="task.id">
                <div class="card-body container" v-if="task.status === header">
                    <contentcard :task-detail="task" v-on:edit-modal="editModal"></contentcard>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import contentcard from './ContentCard'

export default {
  components: {
    contentcard
  },
  props: ['header', 'taskData'],
  data () {
    return {
      activeColor: ''
    }
  },
  methods: {
    editModal (id) {
      console.log('masuk di maincard', id)
      this.$emit('edit-modal', id)
    }
  },
  created () {
    if (this.header === 'backlog') {
      this.activeColor = 'red'
    } else if (this.header === 'todo') {
      this.activeColor = 'yellow'
    } else if (this.header === 'doing') {
      this.activeColor = 'blue'
    } else if (this.header === 'done') {
      this.activeColor = 'green'
    }
  }
}
</script>

<style>

</style>
