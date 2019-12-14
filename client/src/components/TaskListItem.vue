<template>
  <div class="card profile-card-1">
    <img src="https://images.pexels.com/photos/946351/pexels-photo-946351.jpeg?w=500&h=650&auto=compress&cs=tinysrgb" alt="profile-sample1" class="background"/>
    <div class="card-content">
      <h2>{{task.title}}</h2>
      <h2><small><strong>Assigned to : </strong>{{task.assigned}}</small></h2>
      <h2><small>{{task.description}}</small></h2>
      <h2><small><strong>Points: </strong>{{task.poin}}</small></h2>
      <div class="icon-block">
        <a href="#" @click.prevent="prevTask" v-if="task.status !== 'backlog'"> <i class="fa fa-arrow-left"></i></a>
        <a href="#" @click.prevent="deleteTask"> <i class="fa fa-trash-o"></i></a>
        <a href="#" @click.prevent="nextTask" v-if="task.status !== 'done'"> <i class="fa fa-arrow-right"></i></a>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'TaskListItem',
  props: {
    task: Object
  },
  computed: {
    next () {
      let result = ''
      switch (this.task.status) {
        case 'backlog': {
          result = 'todo'
          break
        }
        case 'todo': {
          result = 'doing'
          break
        }
        case 'doing': {
          result = 'done'
          break
        }
      }
      return result
    },
    prev () {
      let result = ''
      switch (this.task.status) {
        case 'done': {
          result = 'doing'
          break
        }
        case 'todo': {
          result = 'backlog'
          break
        }
        case 'doing': {
          result = 'todo'
          break
        }
      }
      return result
    }
  },
  methods: {
    deleteTask () {
      let db = firebase.firestore()
      db.collection('tasks').doc(this.task.id).delete().then(function () {
      })
    },
    nextTask () {
      let db = firebase.firestore()
      db.collection('tasks').doc(this.task.id).update({
        'status': this.next
      }).then(function () {
      })
    },
    prevTask () {
      let db = firebase.firestore()
      db.collection('tasks').doc(this.task.id).update({
        'status': this.prev
      }).then(function () {
      })
    }

  }
}
</script>

<style scoped>
.card {
  width: auto;
  margin: .5rem auto
}
.profile-card-1 {
  font-family: 'Open Sans', Arial, sans-serif;
  position: relative;
  float: left;
  overflow: hidden;
  width: 100%;
  color: #ffffff;
  text-align: center;
  height:auto;
  border:none;
}
.profile-card-1 .background {
  width:100%;
  vertical-align: top;
  opacity: 0.9;
  -webkit-filter: blur(5px);
  filter: blur(5px);
   -webkit-transform: scale(1.8);
  transform: scale(2.8);
}
.profile-card-1 .card-content {
  width: 100%;
  padding: 15px 25px;
  position: absolute;
  left: 0;
  top: 5%;
  color: black
}
.profile-card-1 h2 {
  margin: 0 0 5px;
  font-weight: 600;
  font-size:25px;
}
.profile-card-1 h2 small {
  display: block;
  font-size: 15px;
  margin-top:10px;
}
.profile-card-1 i {
  display: inline-block;
    font-size: 16px;
    color: #ffffff;
    text-align: center;
    border: 1px solid #fff;
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 50%;
    margin:0 5px;
}
.profile-card-1 .icon-block{
    float:left;
    width:100%;
    margin-top:15px;
}
.profile-card-1 .icon-block a{
    text-decoration:none;
}
.profile-card-1 i:hover {
  background-color:#fff;
  color:#2E3434;
  text-decoration:none;
}
</style>
