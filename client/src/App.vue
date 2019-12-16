<template>
  <div>
    <section class="section">
      <h1 style="color: #404040;">Kankanban</h1>
      <b-button class="new" v-b-modal.modal-1>new task</b-button>
      
    </section>
    <b-modal id="modal-1" size="lg" :hide-footer="true">
      <div class="hitam">
        <form @submit.prevent="addTask">
          <p class="my-4">Add new Task</p>
          <b-form-input placeholder="Enter Task Title" v-model="title" :required="true"></b-form-input><br>
          <b-form-textarea
            :required="true"
            v-model="description"
            placeholder="Enter Task Description"
            rows="3"
            max-rows="6"
          ></b-form-textarea><br>
          <b-form-input placeholder="Enter Task Point" :type="'number'" :min="1" v-model="point" :required="true"></b-form-input><br>
          <b-form-input placeholder="Asigned to" v-model="asigned" :required="true"></b-form-input><br>
          <b-button pill variant="outline-primary" :type="'submit'">Add Task</b-button>                     
        </form> 
      </div>
    </b-modal>
    <router-view/>
    <section class="section">
      <h6>copyright &copy; 2019 : reduksi</h6>
    </section>
    
  </div>
</template>

<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/js/script.js'
Vue.use(BootstrapVue)
export default {
  data(){
    return{
      title : '',
      description : '',
      point : 0,
      asigned : ''
    }
  },
  methods:{
    addTask(){
      var db = firebase.firestore();
      db.collection("kanban")
        .add({
          title : this.title,
          point : this.point,
          status : 'Backlog',
          description : this.description,
          asigned : this.asigned
        }).then(doc => {
          this.$bvModal.hide('modal-1')
          this.title = ''
          this.point = 0
          this.description = ''
        }).catch(console.log)
    }
  }
}
</script>

<style>
@import "./assets/css/style.css";
</style>
