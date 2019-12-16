<template>
  <div class="text-gray-700 flex flex-col p-3 px-16">
     <div class="wrapper mx-auto border border-gray-600">
      <h3 class="text-xl font-semibold border-gray-600 bg-indigo-100">Card title</h3>
      <p class="text-gray-600 py-2">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <p class="text-gray-600 py-1">80 points</p>
      <p class="text-gray-600 py-1">Zoe Zachary</p>
     </div>
  </div>
</template>

<script>
export default {
   name: 'KanbanCard'
}
</script>

<style scoped>
   h3 {
      border-bottom: 1px solid;
   }

   wrapper {
      width: 80%;
   }
</style>