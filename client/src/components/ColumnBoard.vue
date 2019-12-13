<template>
  <b-col cols="3" class="border rounded">
    <h4 v-if="category === 'Back-Log'" class="mt-2 rounded p-2" style="color: white; background-color: #4AA3B9">{{ category }}</h4>
    <h4 v-if="category === 'To-Do'" class="mt-2 rounded p-2" style="color: white; background-color: orange">{{ category }}</h4>
    <h4 v-if="category === 'Doing'" class="mt-2 rounded p-2" style="color: white; background-color: blue">{{ category }}</h4>
    <h4 v-if="category === 'Done'" class="mt-2 rounded p-2" style="color: white; background-color: green">{{ category }}</h4>
    <CardItem v-for="task in listOfTasks" :key="task.id" :task="task"></CardItem>
  </b-col>
</template>

<script>
import CardItem from './CardItem.vue'
import db from '../../config'
export default {
  name: 'ColumnBoard',
  props: ['category'],
  data () {
    return {
      listOfTasks: []
    }
  },
  components: {
    CardItem
  },
  created () {
    db.collection('tasks').where('status', '==', this.category)
      .onSnapshot(querySnapshot => {
        let tempArr = []
        querySnapshot.forEach(doc => {
          let task = { id: doc.id, ...doc.data() }
          tempArr.push(task)
        })
        this.listOfTasks = tempArr
      }, err => {
        console.log(err)
      })
  }
}
</script>

<style>

</style>
