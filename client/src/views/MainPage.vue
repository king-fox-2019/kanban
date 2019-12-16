<template>
    <div>
        <div>
            <navbar></navbar>
        </div>
        <div class="row">
            <div v-for="(data,index) in category" :key="index" class="col-3">
                <maincard :task-data="task" :header="data" v-on:edit-modal="editModal"></maincard>
            </div>
        </div>
        <div>
          <editmodal :show-detail="taskDetail"></editmodal>
        </div>
    </div>
</template>

<script>

import maincard from '../components/MainCard'
import navbar from '../components/Navbar'
import editmodal from '../components/EditModal'
import db from '../../config/firestore'

export default {
  components: {
    maincard,
    navbar,
    editmodal
  },
  data () {
    return {
      task: [],
      category: ['backlog', 'todo', 'doing', 'done'],
      taskDetail: null
    }
  },
  methods: {
    editModal (id) {
      for (let i = 0; i < this.task.length; i++) {
        if (this.task[i].id === id) {
          this.taskDetail = this.task[i]
        }
      }
    }
  },
  created () {
    db.collection('Task')
      .onSnapshot((querySnapshot) => {
        let newTask = []
        querySnapshot.forEach((doc) => {
          let objTask = {
            id: doc.id,
            ...doc.data()
          }
          newTask.push(objTask)
        })
        this.task = newTask
      })
  }
}
</script>

<style>

</style>
