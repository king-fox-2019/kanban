<template>
  <li class="drag-column drag-column-on-hold">
    <span class="drag-column-header" :style="`background: ${colorbase};`">
        <h2>{{title}}</h2>
    </span>
    <ul class="drag-inner-list" id="1">
        <Task v-for="(task,id) in tasklist" :key="id" :task="task" :colorbase="colorbase" @seedetail="seedetail"/>
    </ul>
    <b-modal :id="title" size="lg" :hide-footer="true">
      <div class="hitam">
        <h4>Title : </h4>{{titles}}
        <h4>Description : </h4>{{description}}
        <h4>Point : </h4>{{point}}
        <h4>Asigned : </h4>{{asigned}}
        <br><br>
        <div style="width:100%; display:flex; justify-content:space-between;">
          <b-button pill variant="outline-warning" :type="'submit'" v-show="before" @click="updateStage(before)">{{before}}</b-button>
          <b-button pill variant="outline-danger" :type="'submit'" @click="deleteTask()">Delete</b-button>
          <b-button pill variant="outline-primary" :type="'submit'" v-show="after" @click="updateStage(after)">{{after}}</b-button>
        </div>
      </div>
    </b-modal>
  </li>
</template>

<script>
import Task from './kanbanTask'
var db = firebase.firestore();
export default {
    name:'stage',
    components:{
        Task
    },
    data(){
      return{
        idKanban:'',
        titles : '',
        description : '',
        point : 0,
        asigned : '',
        before : '',
        after : '',
        kind : ['Backlog','Todo','Doing','Done']
      }
    },
    props:['colorbase','tasklist', 'title'],
    methods:{
      deleteTask(){
        swal({
          title: "Are you sure want to delete?",
          buttons: true,
          dangerMode:true,
        })
        .then((willDelete) => {
          if (willDelete) {
            db.collection('kanban').doc(this.idKanban)
              .delete()
              .then(()=>{
                this.$bvModal.hide(this.title)
              })      
          }
        });
      },
      updateStage(newStage){
        swal({
          title: "Are you sure?",
          buttons: true,
        })
        .then((willUpdate) => {
          if (willUpdate) {
            db.collection('kanban').doc(this.idKanban)
              .set({
                title : this.titles,
                description : this.description,
                point : this.point,
                asigned : this.asigned,
                status : newStage
              })
              .then(data => {
                this.$bvModal.hide(this.title)
              })  
          }
        }); 
      },
      seedetail(task){
        if(this.kind.indexOf(this.title)){
          this.before = this.kind[this.kind.indexOf(this.title) - 1]
        }
        if(this.kind.indexOf(this.title) != this.kind.length){
          this.after = this.kind[this.kind.indexOf(this.title) + 1]
        }
        db.collection('kanban').doc(task)
          .get()
          .then((doc) => {
            let data = doc.data()
            this.idKanban = doc.id
            this.titles = data.title
            this.description = data.description
            this.point = data.point
            this.asigned = data.asigned
            this.$bvModal.show(this.title)
          })
      }
    }
}
</script>

<style>

</style>