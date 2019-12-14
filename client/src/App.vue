<template>
  <div id="app">
    <NavBar />
    <b-container fluid class="task-board">
      <b-row>
        <BoardItem :sendData="dataBacklog"></BoardItem>
        <BoardItem :sendData="dataTodo" />
        <BoardItem :sendData="dataDoing" />
        <BoardItem :sendData="dataDone" />
      </b-row>
    </b-container>
  </div>
</template>

<script>
import BoardItem from './components/BoardItem.vue'
import NavBar from './components/NavBar.vue'
import db from '../config/firebase'

export default {
  
  name: 'app',
  data () {
    return {

      dataBacklog: {
        title: 'Backlog',
        color: 'danger',  
        tasks: []
      },
      dataTodo: {
        title: 'Todo',
        color: 'warning',  
        tasks: []
      },
      dataDoing: {
        title: 'Doing',
        color: 'info',  
        tasks: []
      },
      dataDone: {
        title: 'Done',
        color: 'success',  
        tasks: []
      }

    }
  },
  methods: {
    getData() {
      db.collection("kanban").onSnapshot(querySnapshot => {
        
        this.dataBacklog.tasks = [],
        this.dataTodo.tasks = [],
        this.dataDoing.tasks = [],
        this.dataDone.tasks = []

        querySnapshot.forEach(doc => {
          if (doc.data().status === "backlog") {
            this.dataBacklog.tasks.push({id: doc.id, ...doc.data()})
          }
          if (doc.data().status === "todo") {
            this.dataTodo.tasks.push({id: doc.id, ...doc.data()})
          }
          if (doc.data().status === "doing") {
            this.dataDoing.tasks.push({id: doc.id, ...doc.data()})
          }
          if (doc.data().status === "done") {
            this.dataDone.tasks.push({id: doc.id, ...doc.data()})
          }
        })
      })
    }
  },
  created () {
    this.getData()
  },
  components: {
    BoardItem,
    NavBar
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
