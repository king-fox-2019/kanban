<template>
  <div class="flex flex-col kanban-container mt-10">
     <h2 class="text-2xl font-bold rounded mx-10 text-gray-800" :class="bgColor">{{boardName}}</h2>
     <kanban-card v-for="(kanban, i) in kanbans" :key="i" :kanban="kanban" />
  </div>
</template>

<script>
import KanbanCard from '@/components/KanbanCard.vue'

const db = firebase.firestore()

export default {
   name: 'KanbanContainer',
   components: {
      'kanban-card': KanbanCard 
   },
   data() {
      return {
         kanbans: []
      }
   },
   props: {
      bgColor: String,
      boardName: String
   },

   methods: {
      fetchKanban() {
         db.collection('kanban').onSnapshot((snapshot) => {
            this.kanbans = []
            snapshot.forEach(doc => {
               let currentKanbanFromSnapshot = doc.data()
               currentKanbanFromSnapshot.id = doc.id

               if(currentKanbanFromSnapshot.status == this.boardName) {
                  this.kanbans.push(currentKanbanFromSnapshot)
               }
            })
         })
      }
   },

   mounted() {
      this.fetchKanban()
   }
}
</script>

<style>
   .kanban-container {
      width: 23vw;
   }
</style>