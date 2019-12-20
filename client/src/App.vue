<template>
  <div id="app">
    <KanbanNav/>
    <router-view/>
  </div>
</template>

<script>

import KanbanNav from './components/kanbanNav.vue'

export default {
  components: {
    KanbanNav
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
