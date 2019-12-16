<template>
  <div class='home'>
    <NavBar @getData='getAll'></NavBar>
    <div class="container mt-4">
      <div class="row">
        <div v-for='(data, index) in tasksLists' :key='index' style='justify-content:space-around;' class="col-sm">
          <TaskList :data="data" @getData='getAll'></TaskList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '../config/config.js'
import TaskList from '../components/TaskList.vue'
import NavBar from '../components/Navbar.vue'

const tasks = [
  {
    name: 'Backlog',
    data: []
  },
  {
    name: 'To-Do',
    data: []
  },
  {
    name: 'Doing',
    data: []
  },
  {
    name: 'Done',
    data: []
  }
]

export default {
  name: 'home',
  components: {
    TaskList,
    NavBar
  },
  data () {
    return {
      tasksLists: tasks
    }
  },
  methods: {
    getAll () {
      tasks[0].data = []
      tasks[1].data = []
      tasks[2].data = []
      tasks[3].data = []

      db.collection('tasks').get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let obj = {
              id: doc.id,
              title: doc.data().title,
              description: doc.data().description,
              assigned: doc.data().assigned,
              status: doc.data().status
            }
            if (obj.status === 0) {
              tasks[0].data.push(obj)
            } else if (obj.status === 1) {
              tasks[1].data.push(obj)
            } else if (obj.status === 2) {
              tasks[2].data.push(obj)
            } else if (obj.status === 3) {
              tasks[3].data.push(obj)
            }
          })
        })
    }
  },
  created () {
    this.getAll()
  }
}
</script>
