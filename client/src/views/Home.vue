<template>
  <div class="flex flex-col">
    <div class="flex justify-between bg-green-100 shadow items-center">
      <a class="text-3xl p-3 ml-4">Kanban</a>
      <!-- <a class="px-4 py-2 bg-blue-600 text-green-100 rounded mr-4">New task</a> -->
      <router-link to="/create" class="px-4 py-2 bg-blue-600 text-green-100 rounded mr-4">New task</router-link>
    </div>

    <div class="flex justify-around">

      <backlog :bgColor="'bg-red-200'"/>
      <todo :bgColor="'bg-orange-200'"/>
      <doing :bgColor="'bg-blue-200'"/>
      <done :bgColor="'bg-green-200'"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import KanbanContainer from '@/components/KanbanContainer.vue'

export default {
  name: 'home',
  components: {
    backlog: KanbanContainer,
    todo: KanbanContainer,
    doing: KanbanContainer,
    done: KanbanContainer
  }
}
</script>
