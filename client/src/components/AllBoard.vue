<template>
  <b-container class="p-4" fluid>
      <b-row>
        <ColumnBoard v-for="(category, i) in categories" :key="i" :category="category"></ColumnBoard>
      </b-row>
  </b-container>
</template>

<script>
import ColumnBoard from './ColumnBoard'
export default {
  name: 'AllBoard',
  data () {
    return {
      categories: ['Back-Log', 'To-Do', 'Doing', 'Done']
    }
  },
  components: {
    ColumnBoard
  }
}
</script>

<style>

</style>
