<template>
  <div class="flex flex-col kanban-container mt-10">
     <h2 class="text-2xl font-bold rounded mx-10 text-gray-800" :class="bgColor">Backlog</h2>
     <kanban-card />
  </div>
</template>

<script>
import KanbanCard from '@/components/KanbanCard.vue'

export default {
   name: 'KanbanContainer',
   components: {
      'kanban-card': KanbanCard 
   },
   props: {
      bgColor: String
   }
}
</script>

<style>
   .kanban-container {
      width: 23vw;
   }
</style>