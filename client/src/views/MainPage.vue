<template>
  <div class="flex-column">
    <nav class="navbar navbar-dark bg-dark fixed-top">
      <a class="navbar-brand " href="#">
        <img src="@/assets/logo.png" width="30" height="30" class="d-inline-block align-top" alt="">
        Kanvred - Kanban Vue Bootstrap
      </a>
      <button class="btn btn-primary add-task-btn" v-b-modal.addTaskModal>Add Task</button>
    </nav>
    <div class="row" style="width: 100%;">
      <backlog-list class="col-lg-3 col-md-6 col-xs-12" :tasks="kanban.backlogs" :color="`brown`" :title="`Back-Log`"></backlog-list>
      <todo-list class="col-lg-3 col-md-6 col-xs-12" :tasks="kanban.todos" :color="`orange`" :title="`To-Do`"></todo-list>
      <doing-list class="col-lg-3 col-md-6 col-xs-12" :tasks="kanban.doings" :color="`blue`" :title="`Doing`"></doing-list>
      <done-list class="col-lg-3 col-md-6 col-xs-12" :tasks="kanban.dones" :color="`green`" :title="`Done`"></done-list>
    </div>
    <b-modal id="addTaskModal" title="Add Task" hide-footer>
      <form @submit.prevent="addTask">
        <div class="form-group">
          <label for="task">Task :</label>
          <input type="text" class="form-control" id="task" v-model="input.title" required autofocus>
        </div>
        <div class="form-group">
          <label for="assigned">Assigned To :</label>
          <input type="text" class="form-control" id="assigned" v-model="input.assigned" required>
        </div>
        <div class="form-group">
          <label for="description">description :</label>
          <input type="text" class="form-control" id="description" v-model="input.description" required>
        </div>
        <div class="form-group">
          <label for="point">point :</label>
          <input type="number" class="form-control" id="point" v-model="input.poin" required>
        </div>
        <button type="submit" class="btn btn-success">Submit</button>
      </form>
    </b-modal>
  </div>
</template>

<script>
import firebase from 'firebase'
import TaskList from '../components/TaskList'
export default {
  name: 'MainPage',
  components: {
    BacklogList: TaskList,
    TodoList: TaskList,
    DoingList: TaskList,
    DoneList: TaskList
  },
  data: function () {
    return {
      kanban: {
        backlogs: [],
        todos: [],
        doings: [],
        dones: []
      },
      input: {
        poin: 0,
        assigned: '',
        status: 'backlog',
        title: '',
        description: ''
      }
    }
  },
  methods: {
    addTask () {
      let db = firebase.firestore()
      // Add a new document with a generated id.
      db.collection('tasks').add(this.input)
        .then((docRef) => {
          this.input.poin = 0
          this.$bvModal.hide('addTaskModal')
          this.input.assigned = ''
          this.input.title = ''
          this.input.description = ''
        })
    }
  },
  mounted () {
    let db = firebase.firestore()
    // snapshot
    db.collection('tasks')
      .onSnapshot((querySnapshot) => {
        let backlogs = []
        let todos = []
        let doings = []
        let dones = []
        querySnapshot.forEach(doc => {
          const task = { id: doc.id, ...doc.data() }
          switch (task.status) {
            case 'todo': {
              todos.push(task)
              break
            }
            case 'backlog': {
              backlogs.push(task)
              break
            }
            case 'doing': {
              doings.push(task)
              break
            }
            case 'done': {
              dones.push(task)
              break
            }
          }
        })
        this.kanban.backlogs = backlogs
        this.kanban.todos = todos
        this.kanban.doings = doings
        this.kanban.dones = dones
      })
  }
}
</script>

<style scoped>
</style>
