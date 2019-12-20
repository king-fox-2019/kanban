<template>
  <b-container fluid>
    <div class="row my-3">
      <CardDeck title="Backlog" :cards="kanbanList.backlog" />
      <CardDeck title="ToDo" :cards="kanbanList.todo" />
      <CardDeck title="Doing" :cards="kanbanList.doing" />
      <CardDeck title="Done" :cards="kanbanList.done" />
    </div>

    <b-modal id="addTaskModal" title="Add New Task" hide-footer>
      <form @submit.prevent="addTask">
        <div class="form-group">
          <label for="task">Task :</label>
          <input type="text" class="form-control" id="task" v-model="dataInput.title" required autofocus>
        </div>
        <div class="form-group">
          <label for="description">Description :</label>
          <textarea class="form-control" id="description" rows="4" v-model="dataInput.description" required></textarea>
        </div>
        <div class="form-group">
          <label for="assigned">Assigned To :</label>
          <input type="text" class="form-control" id="assigned" v-model="dataInput.assigned" required>
        </div>
        <div class="form-group">
          <label for="point">Point :</label>
          <input type="text" class="form-control" id="point" v-model="dataInput.point" required>
        </div>
        <button type="submit" class="btn btn-success">Submit</button>
      </form>
    </b-modal>
  </b-container>
</template>

<script>
// @ is an alias to /src
import firebase from 'firebase'
import CardDeck from '../components/CardDeck.vue'

export default {
  name: 'home',
  data: function(){
    return {
      db: firebase.firestore(),
      dataInput: {
        title: null,
        description: null,
        assigned: null,
        point: null
      },
      kanbanList: {
        backlog: [],
        todo: [],
        doing: [],
        done: []
      },
    }
  },
  methods: {
    addTask: function() {
      let db = firebase.firestore()
      db.collection('tasks').add(
        {
          title: this.dataInput.title,
          description: this.dataInput.description,
          point: this.dataInput.point,
          assigned: this.dataInput.assigned,
          status: 'backlog'
        }
      )
        .then((docRef) => {
          this.dataInput= {
            title: null,
            description: null,
            point: null,
            assigned: null
          },
          this.$bvModal.hide('addTaskModal')
        })
    }
  },
  components: {
    CardDeck
  },
  beforeCreate() {
    let db = firebase.firestore()
    // snapshot
    db.collection('tasks')
      .onSnapshot((querySnapshot) => {
        this.kanbanList= {
          backlog: [],
          todo: [],
          doing: [],
          done: []
        }
        querySnapshot.forEach(doc => {
          const task = { id: doc.id, ...doc.data() }
          this['kanbanList'][task.status].push(task)
        })
      })
  }
}
</script>

<style scoped>
</style>