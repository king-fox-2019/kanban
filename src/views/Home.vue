<template>
  <div class="container">
    <div class="row">
      <div class="col" v-for="category in orderedCategories" :key=category.id>
        <Category :obj=category :categories=orderedCategories :tasks=tasks @task-detail=taskDetail />
        <TaskDetail v-if="taskInModal" :taskInModal=taskInModal :updateOptions=updateOptions />
      </div>
    </div>
  </div>
</template>

<script>
import Category from '@/components/Category.vue'
import TaskDetail from '@/components/TaskDetail.vue'
import db from '@/config/firebase.js'

export default {
  name: 'home',
  data () {
    return {
      categories: [],
      tasks: [],
      taskInModal: null,
      updateOptions: []
    }
  },
  components: {
    Category,
    TaskDetail
  },
  methods: {
    taskDetail (task) {
      this.taskInModal = task
      this.getOptions()
    },
    getOptions () {
      let status = this.taskInModal.currentCategory.status
      if (status === 0) {
        this.updateOptions = ['', 1]
      } else if (status === this.taskInModal.categories.length) {
        this.updateOptions = [status, '']
      } else {
        this.updateOptions = [status - 1, status + 1]
      }
    },
    getCategories () {
      db.collection('categories')
        .onSnapshot(querySnapshot => {
          querySnapshot.forEach(doc => {
            let category = {
              id: doc.id,
              ...doc.data()
            }
            this.categories.push(category)
          })
        })
    },
    getTasks () {
      db.collection('tasks')
        .onSnapshot(querySnapshot => {
          let result = []
          querySnapshot.forEach(doc => {
            let task = {
              id: doc.id,
              ...doc.data()
            }
            result.push(task)
          })
          this.tasks = result
        })
    }
  },
  created () {
    this.getCategories()
    this.getTasks()
  },
  computed: {
    orderedCategories: function () {
      return this.categories.sort((a, b) => a.status - b.status)
    }
  }
}
</script>
