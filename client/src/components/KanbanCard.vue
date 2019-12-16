<template>
  <div class="text-gray-700 flex flex-col p-3 px-16">
     <div class="mx-auto border border-gray-600">
      <h3 class="text-xl font-semibold border-gray-600 bg-indigo-100">{{kanban.title}}</h3>
      <div class="px-8 py-2">
         <p class="text-gray-600 py-2">{{kanban.description}}</p>
         <p class="text-gray-600 py-1">{{kanban.point}}</p>
         <p class="text-gray-600 py-1">Assignee: {{kanban.assignee}}</p>
      </div>
      <div class="mb-4">
         <a class="bg-green-500 text-gray-700 font-semibold py-1 px-2 mr-2 rounded cursor-pointer" @click.prevent="pushDown"><-</a>
         <a class="bg-red-500 text-gray-700 font-semibold py-2 px-4 rounded cursor-pointer" @click.prevent="deleteKanban">Delete</a>
         <a class="bg-green-500 text-gray-700 font-semibold py-1 px-2 ml-2 rounded cursor-pointer" @click.prevent="pushUp">-></a>
      </div>
     </div>
  </div>
</template>

<script>

const db = firebase.firestore()

export default {
   name: 'KanbanCard',
   props: {
      kanban: Object
   },

   methods: {
      deleteKanban() {

         console.log(this.kanban.id)
         db.collection('kanban').doc(this.kanban.id).delete()
         .then(() => {
            console.log('kanban deleted')
         })
         .catch(error => console.log(error))
      },

      pushUp() {
         if(this.kanban.status != 'done') {
            let newStatus = this.kanban.status

            if(this.kanban.status == 'backlog') newStatus = 'todo'
            else if(this.kanban.status == 'todo') newStatus = 'doing'
            else newStatus = 'done'

            db.collection('kanban').doc(this.kanban.id).update({
               status: newStatus
            })
            .then(() => {
               console.log('status kanban has been successfully pushed up')
            })
            .catch(error => console.log(error))
         }
      },

      pushDown() {
         if(this.kanban.status != 'backlog') {
            let newStatus = this.kanban.status
            
            if(this.kanban.status == 'done') newStatus = 'doing'
            else if(this.kanban.status == 'doing') newStatus = 'todo'
            else newStatus = 'backlog'

            db.collection('kanban').doc(this.kanban.id).update({
               status: newStatus
            })
            .then(() => {
               console.log('status kanban has been successfully pushed down')
            })
            .catch(error => console.log(error))
         }
      }
   }
}
</script>

<style scoped>
   h3 {
      border-bottom: 1px solid;
   }
</style>