<template>
  <div>
    <b-card-group deck>
      <b-card :header="title" header-text-variant="white" :header-bg-variant="variant">
        <draggable class="list-group" :list="list" group="people">
          <div v-for="task in list" :key="task.title">
            <KanbanCard :task="task" @delete-task="deleteTask" />
          </div>
        </draggable>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import KanbanCard from '../components/KanbanCard'

export default {
  name: 'CardHeader',
  components: {
    draggable,
    KanbanCard
  },
  props: ['title', 'list', 'variant'],
  methods: {
    deleteTask (id) {
      this.$emit('delete-task', id)
    }
  }
}
</script>

<style>
</style>
