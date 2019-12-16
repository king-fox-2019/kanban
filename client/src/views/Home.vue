<template>
 <div class="drag-container">
    <ul class="drag-list">
     <backlog :colorbase="'#9c44fb'" :tasklist="backlog" :title="'Backlog'"/>
     <todo :colorbase="'#fb4444'" :tasklist="todo" :title="'Todo'"/>
     <doing :colorbase="'#448afb'" :tasklist="doing" :title="'Doing'"/>
     <done :colorbase="'#FB7D44'" :tasklist="done" :title="'Done'"/>
    </ul>
 </div>
</template>

<script>
import Stage from '../components/kanbanStage'
export default {
  name: 'home',
  components: {
      backlog : Stage,
      todo : Stage,
      doing : Stage,
      done : Stage
  },
  data(){
    return{
        backlog : [],
        todo : [],
        doing : [],
        done : []
    }
  },
  methods:{
      fetchTask(){
        var db = firebase.firestore();
        db.collection("kanban")
        .onSnapshot((snapshot) => {
            let obj = []
            snapshot.forEach(function(doc){
                obj.unshift({
                    id : doc.id,
                    ... doc.data()
                }) 
            })
            this.backlog = obj.filter(task => task.status == 'Backlog');
            this.todo = obj.filter(task => task.status == 'Todo');
            this.doing = obj.filter(task => task.status == 'Doing');
            this.done = obj.filter(task => task.status == 'Done');
        });
      }
  },
  created(){
   this.fetchTask()
  }
}
</script>

<style>

</style>
