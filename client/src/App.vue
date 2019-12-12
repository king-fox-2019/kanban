<template>
  <div id="app">
    <div class="container mt-3">
      <b-nav align="right">
        <b-nav-item right>
          <b-button v-b-modal.modal-1>Add Task</b-button>
          <div class="text-center">
            <b-modal id="modal-1" ref="modal1" centered title="BootstrapVue">
              <b-form @submit.prevent="addTask">
                <b-form-group label="Task title :" label-for="title">
                  <b-form-input id="title" v-model="title" required placeholder="Enter title"></b-form-input>
                  {{title}}
                </b-form-group>
                <b-form-group label="Task description :" label-for="textarea">
                  <b-form-textarea
                    id="textarea"
                    v-model="description"
                    placeholder="Enter description..."
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>
                </b-form-group>
                <b-form-group label="Task point :" label-for="point">
                  <b-form-input id="point" v-model="point" required placeholder="Enter point"></b-form-input>
                </b-form-group>
                <b-form-group label="Assigned to :" label-for="assigned">
                  <b-form-input
                    id="assigned"
                    v-model="assignedTo"
                    required
                    placeholder="Assigned to"
                  ></b-form-input>
                </b-form-group>
                <div slot="modal-footer">
                  <b-button type="submit" variant="primary">Submit</b-button>
                </div>
              </b-form>
            </b-modal>
          </div>
        </b-nav-item>
      </b-nav>
    </div>
    <div class="container mt-5">
      <div class="row">
        <b-card-group deck>
          <container class="col-md-3" :header="'Back Log'" :bgVariant="'danger'" :todos="backlog"></container>
          <container class="col-md-3" :header="'To-Do'" :bgVariant="'info'" :todos="todo"></container>
          <container class="col-md-3" :header="'Doing'" :bgVariant="'primary'" :todos="doing"></container>
          <container class="col-md-3" :header="'Done'" :bgVariant="'success'" :todos="done"></container>
        </b-card-group>
      </div>
    </div>
  </div>
</template>

<script>
import container from "@/components/container.vue"

export default {
  data() {
    return {
      title: "",
      description: "",
      point: "",
      assignedTo: "",
      backlog: [],
      todo: [],
      doing: [],
      done: []
    };
  },
  components: {
    container
  },
  methods: {
    addTask() {
      this.$refs.modal1.hide()
      this.$db
        .collection("Todos")
        .add({
          title: this.title,
          description: this.description,
          point: this.point,
          assignedTo: this.assignedTo,
          status: 'backlog'
        })
        .then(function(docRef) {
          console.log('a')
          console.log("Document written with ID: ", docRef.id)
        })
        .catch(function(error) {
          console.error("Error adding document: ", error)
        })
    }
  },
  created() {
    this.$db.collection("Todos").onSnapshot(querySnapshot => {
      let backlog=[]
      let todo = []
      let doing = []
      let done = []
      querySnapshot.forEach(doc => {
        if (doc.data().status === "backlog"){
          let data = doc.data()
          data.id = doc.id
          backlog.push(data)
        } 
        else if (doc.data().status === "todo"){
          let data = doc.data()
          data.id = doc.id
          todo.push(data)
        } 
        else if (doc.data().status === "doing"){
          let data = doc.data()
          data.id = doc.id
          doing.push(data)
        } 
        else{
          let data = doc.data()
          data.id = doc.id
          done.push(data)
        }
      })
      this.backlog = backlog
      this.todo = todo
      this.doing = doing
      this.done = done
      console.log(this.backlog,this.todo,this.doing,this.done)
    })
  }
};
</script>

<style>
</style>
