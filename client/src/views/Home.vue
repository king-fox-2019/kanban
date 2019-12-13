<template>
  <div id="Home">
    <Navbar />
    <b-container class="mt-5">
      <b-row>
        <b-col>
          <CardHeader
            title="Back-Log"
            variant="danger"
            :list="status.backlog"
            @delete-task="deleteTask"
          />
        </b-col>
        <b-col>
          <CardHeader
            title="To-Do"
            variant="warning"
            :list="status.todo"
            @delete-task="deleteTask"
          />
        </b-col>
        <b-col>
          <CardHeader
            title="Doing"
            variant="primary"
            :list="status.doing"
            @delete-task="deleteTask"
          />
        </b-col>
        <b-col>
          <CardHeader title="Done" variant="success" :list="status.done" @delete-task="deleteTask" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import Navbar from '../components/Navbar'
import CardHeader from '../components/CardHeader'
import db from '../../config/firebase'

export default {
  name: 'Home',
  components: {
    Navbar,
    CardHeader
  },
  data () {
    return {
      status: {
        backlog: [],
        todo: [],
        doing: [],
        done: []
      }
    }
  },
  methods: {
    fetchTasks () {
      db.collection('tasks').onSnapshot(querySnapshot => {
        let arrayBacklog = []
        let arrayTodo = []
        let arrayDoing = []
        let arrayDone = []
        querySnapshot.docs.forEach(task => {
          let objTask
          if (task.data().status === 'backlog') {
            objTask = task.data()
            objTask.id = task.id
            arrayBacklog.push(objTask)
          } else if (task.data().status === 'todo') {
            objTask = task.data()
            objTask.id = task.id
            arrayTodo.push(objTask)
          } else if (task.data().status === 'doing') {
            objTask = task.data()
            objTask.id = task.id
            arrayDoing.push(objTask)
          } else if (task.data().status === 'done') {
            objTask = task.data()
            objTask.id = task.id
            arrayDone.push(objTask)
          }
        })
        this.status.backlog = arrayBacklog
        this.status.todo = arrayTodo
        this.status.doing = arrayDoing
        this.status.done = arrayDone
      })
    },
    deleteTask (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this action!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      })
        .then(result => {
          if (result.value) {
            db.collection('tasks').doc(id).delete()
            Swal.fire('Deleted!', 'Task has been deleted.', 'success')
          }
        })
        .catch(err => {
          console.log(err)
          Swal.fire('error', 'internal server error', 'error')
        })
    }
  },
  computed: {
    backlog () {
      return this.status.backlog
    },
    todo () {
      return this.status.todo
    },
    doing () {
      return this.status.doing
    },
    done () {
      return this.status.done
    }
  },
  watch: {
    backlog () {
      this.status.backlog.forEach(task => {
        if (task.status !== 'backlog') {
          db.collection('tasks')
            .doc(task.id)
            .update({ status: 'backlog' })
        }
      })
    },
    todo () {
      this.status.todo.forEach(task => {
        if (task.status !== 'todo') {
          db.collection('tasks')
            .doc(task.id)
            .update({ status: 'todo' })
        }
      })
    },
    doing () {
      this.status.doing.forEach(task => {
        if (task.status !== 'doing') {
          db.collection('tasks')
            .doc(task.id)
            .update({ status: 'doing' })
        }
      })
    },
    done () {
      this.status.done.forEach(task => {
        if (task.status !== 'done') {
          db.collection('tasks')
            .doc(task.id)
            .update({ status: 'done' })
        }
      })
    }
  },
  created () {
    this.fetchTasks()
  }
}
</script>

<style scoped>
#Home {
  background-image: url("../assets/crumpledpaper.jpg");
  height: 100vh;
  overflow: auto;
}
.home.row {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
}
</style>
