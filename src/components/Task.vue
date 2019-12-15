<template>
    <div class="card">
        <div class="card-header">
            {{ task.title }}
        </div>
        <div class="card-body">
            <p class="card-text">Point: {{ task.point }}</p>
            <p class="card-text">Assigned to: {{ task.assignTo }}</p>
            <button @click="taskClicked(task)" type="button" class="btn btn-primary" data-toggle="modal" data-target="#taskModal">
                Show Detail
            </button>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['task'],
  methods: {
    taskClicked (task) {
      this.$emit('task-detail', task)
    }
  }
}
</script>
