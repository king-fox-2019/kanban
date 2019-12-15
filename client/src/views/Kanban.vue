<template>
  <app-kanban />
</template>

<script>
import kanbanCard from '../components/kanbanCard.vue'

export default {
  data () {
    return {
    }
  },
  components: {
    'app-kanban': kanbanCard
  }
}
</script>

<style>

</style>
