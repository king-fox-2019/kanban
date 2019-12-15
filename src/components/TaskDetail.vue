<template>
    <div class="modal fade" id="taskModal" tabindex="-1" role="dialog" aria-labelledby="taskModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="taskModalLabel">
                        Detail task: {{ taskInModal.task.title }} for {{ taskInModal.task.assignTo }}
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <strong>Task Description: </strong>
                    <p>{{ taskInModal.task.description }}</p>
                    <strong>Point: </strong>
                    <p>{{ taskInModal.task.point }}</p>
                    <strong>Status: </strong>
                    <p>{{ taskInModal.currentCategory.name }}</p>
                </div>
                <div class="modal-footer">
                    <button
                        v-if="updateOptions[0] !== ''"
                        class="btn btn-primary"
                        @click.prevent="updateTaskTo(taskInModal.task.id, updateOptions[0])"
                        data-dismiss="modal">
                        {{ taskInModal.categories[updateOptions[0]].name }}
                    </button>
                    <button type="button" class="btn btn-primary" @click.prevent="deleteTask(taskInModal.task.id)" data-dismiss="modal">Delete</button>
                    <button
                        v-if="updateOptions[1] !== ''"
                        class="btn btn-primary"
                        @click.prevent="updateTaskTo(taskInModal.task.id, updateOptions[1])"
                        data-dismiss="modal">
                        {{ taskInModal.categories[updateOptions[1]].name }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import db from '@/config/firebase.js'
export default {
  data () {
    return {
    }
  },
  props: ['taskInModal', 'updateOptions'],
  methods: {
    deleteTask (id) {
      db.collection('tasks').doc(id).delete()
    },
    updateTaskTo (taskId, categoryStatus) {
      let category = this.taskInModal.categories.filter(item => item.status === categoryStatus)
      let task = db.collection('tasks').doc(taskId)
      task.update({ status: category[0].id })
    }
  }
}
</script>
