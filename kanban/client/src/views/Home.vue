<template>
  <div id="home">
    <Navbar :user="user" style="position: sticky;"></Navbar>
    <b-container class="mt-5">
      <b-row>
        <b-col>
          <Board title="Back-log" :list="status.backlog" @delete="remove" />
        </b-col>
        <b-col>
          <Board title="To-Do" :list="status.todo" @delete="remove" />
        </b-col>
        <b-col>
          <Board title="Ongoing" :list="status.ongoing" @delete="remove" />
        </b-col>
        <b-col>
          <Board title="Done" :list="status.done" @delete="remove" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Board from '@/components/Board.vue'
import firebase from '@/configs/firebase'
const db = firebase.firestore()

export default {
  name: 'home',
  components: {
    Navbar,
    Board
  },
  data () {
    return {
      status: {
        backlog: [],
        todo: [],
        ongoing: [],
        done: []
      },
      modal_form: {
        title: '',
        description: '',
        for: ''
      }
    }
  },
  methods: {
    showAll () {
      db.collection('tasks').onSnapshot(querySnapshot => {
        let arrBackLog = []
             arrTodo = []
             arrOngoing = []
             arrDone = []
        querySnapshot.docs.forEach(task => {
          let objTask
      
          if (task.data().status === 'backlog') {
              objTask = task.data()
              objTask.id = task.id
              arrBackLog.push(objTask)
          } else if (task.data().status === 'todo') {
              objTask = task.data()
              objTask.id = task.id
              arrTodo.push(objTask)
          } else if (task.data().status === 'ongoing') {
            objTask = task.data()
              objTask.id = task.id
              arrOngoing.push(objTask)
          } else if (task.data().status === 'done') {
            objTask = task.data()
              objTask.id = task.id
              arrDone.push(objTask)
          }
        })
        this.status.backlog = arrBackLog
        this.status.todo = arrTodo
        this.status.ongoing = arrOngoing
        this.status.done = arrDone
      })
    },
    remove (id) {
      db.collection('tasks')
        .doc(id)
        .delete()
    }
  },
  computed: {
    backlog () {
      return this.status.backlog
    },
    todo () {
      return this.status.todo
    },
    ongoing () {
      return this.status.ongoing
    },
    done () {
      return this.status.done
    },
    user () {
      var user = firebase.auth().currentUser
      var name, email, photoUrl, uid, emailVerified
      console.log(user, 'di home')
      if (user != null) {
        name = user.displayName
        email = user.email
        photoUrl = user.photoURL
        emailVerified = user.emailVerified
        uid = user.uid // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
        return email
      } else {
        return null
      }
    }
  },
  watch: {
    backlog () {
      this.status.backlog.forEach(task => {
        if (task.status !== 'backlog') {
          db.collection('tasks').doc(task.id).update({
              status: 'backlog'
            })
        }
      })
    },
    todo () {
      this.status.todo.forEach(task => {
        if (task.status !== 'todo') {
          db.collection('tasks').doc(task.id).update({
              status: 'todo'
            })
        }
      })
    },
    ongoing () {
      this.status.ongoing.forEach(task => {
        if (task.status !== 'ongoing') {
          db.collection('tasks').doc(task.id).update({
              status: 'ongoing'
            })
        }
      })
    },
    done () {
      // console.log('done')
      this.status.done.forEach(task => {
        if (task.status !== 'done') {
          db.collection('tasks').doc(task.id).update({
              status: 'done'
            })
        }
      })
    }
  },
  created () {
    this.showAll()
  }
}
</script>

<style scoped>
#home {
  background-image: url("../assets/baloon.jpg");
  background-size: cover;
  background-repeat: repeat;
  padding-top: 0px;
  height: fit-content;
}
h6 {
  color: white;
  margin: 5px;
  margin-bottom: 15px;
  font-style: italic;
  font-size: 11px;
}
.mt-5 {
  background-color: rgba(60, 63, 61, 0.87);
  padding: 20px;
  width: 80%;
  overflow: scroll;
  margin-top: 0px;
}
</style>
