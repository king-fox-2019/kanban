<template>
   <div class="flex justify-center items-center">
      <form class="flex flex-col border border-indigo-300 items-center py-5 rounded-lg" @submit.prevent="addNewTask">
         <label class="font-semibold text-gray-700 text-lg mb-2">Kanban title</label>
         <input type="text" class="bg-transparent border-b mb-2 px-5" v-model='title' required />
         <label class="font-semibold text-gray-700 text-lg mb-2">Description</label>
         <input type="text" class="bg-transparent border-b mb-2 px-5" v-model="description" />
         <label class="font-semibold text-gray-700 text-lg mb-2">Assignee</label>
         <input type="text" class="bg-transparent border-b mb-2 px-5" v-model="assignee" required/>
         <label class="font-semibold text-gray-700 text-lg mb-2">Points</label>
         <input type="text" class="bg-transparent border-b mb-2 px-5" v-model="point" />
         <input type="submit" class="mt-4 rounded bg-blue-300 cursor-pointer" />
      </form>
   </div>
</template>

<script>
const db = firebase.firestore()

export default {
   name: 'Create',
   data() {
      return {
         title: '',
         description: '',
         assignee: '',
         point: 0
      }
   },
   methods: {
      addNewTask() {
         db.collection('kanban').add({
            title: this.title,
            description: this.description,
            assignee: this.assignee,
            point: this.point,
            status: 'backlog'
         })
         .then(docRef => {
            console.log('document written with id:', docRef.id)
            console.log('isi docRef', docRef)
         })
         .catch(error => {
            console.log(error)
         })
      }
   }
}
</script>

<style scoped>
   div {
      height: 90vh;
   }

   form {
      width: 38.2%;
   }

   input[type="submit"] {
      width: 17rem;
   }

   input[type="text"] {
      outline-style: none;
   }
</style>