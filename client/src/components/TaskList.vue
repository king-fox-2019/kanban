<template>
  <div class="card-column" style="display:flex; flex-direction:column;">
    <h2 class="bg-light" style="border: 1px solid gray; border-radius: 5px"> {{ data.name }} </h2>
    <div style="border: 1px solid gray; height: 75vh; overflow: auto; padding-top: 20px; border-radius: 5px">
      <Task v-for="(item) in data.data" :key="item.id" :item="item" :name="data.name" @getData="getData"></Task>
    </div>
  </div>
</template>

<script>
import Task from '../components/Task.vue'
export default {
  props: {
    data: Object
  },
  methods: {
    getData () {
      this.$emit('getData')
    }
  },
  name: 'TaskList',
  components: {
    Task
  },
  created () {
  }
}
</script>

<style>
</style>
