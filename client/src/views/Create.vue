<template>
   <div class="flex justify-center items-center">
      <form class="flex flex-col border border-indigo-300 items-center py-5 rounded-lg">
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
export default {
   name: 'Create',
   data() {
      return {
         title: '',
         description: '',
         assignee: '',
         point: 0
      }
   }
}
</script>

<style>
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