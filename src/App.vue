<template>
  <div id="app">
    <div id="nav">
      <h2>Kanban Board</h2>
      <button v-b-modal.newTask>New Task</button>
      <b-modal id="newTask" title="New Task" size="lg" hide-footer>
        <div>
          <b-form @submit.prevent="addNewTask">
            <b-form-group id="input-group-1" label="Title" label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="form.Title"
                type="text"
                required
                placeholder="Task Title"
                maxlength="15"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Description" label-for="input-2">
              <b-form-textarea
                id="input-2"
                v-model="form.Desc"
                type="text"
                placeholder="Task Short Description"
                style="resize: vertical; max-height: 250px;"
                maxlength="120"
              ></b-form-textarea>
            </b-form-group>

            <b-form-group id="input-group-3" label="Point" label-for="input-3">
              <b-form-input id="input-3" v-model="form.Point" type="number" placeholder="0" max="120" min="0"></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" label="Assigned To" label-for="input-4">
              <b-form-input
                id="input-4"
                v-model="form['Assigned to']"
                type="text"
                placeholder="Assigned to"
                maxlength="15"
              ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form>
        </div>
      </b-modal>
    </div>
    <div id="item_handler">
      <Table :bindData="['Back-Log','danger', backLog]" />
      <Table :bindData="['To-Do', 'warning', toDo]" />
      <Table :bindData="['Doing', 'primary', doing]" />
      <Table :bindData="['Done', 'success', done]" />
    </div>
  </div>
</template>

<script>
import Table from "./components/Table.vue";
import { db } from "./firebase.js";

export default {
  name: "app",
  components: {
    Table
  },
  data() {
    return {
      showModal: false,
      backLog: [],
      toDo: [],
      doing: [],
      done: [],
      form: {
        Title: "",
        Desc: "",
        Point: 0,
        "Assigned to": null,
        Status: "Back Log"
      }
    };
  },
  methods: {
    addNewTask() {
      this.$bvModal.hide("newTask");
      db.collection("kanban")
        .add(this.form)
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    }
  },
  created() {
    db.collection("kanban").onSnapshot(querySnapshot => {
      this.backLog = [];
      this.toDo = [];
      this.doing = [];
      this.done = [];
      querySnapshot.forEach(doc => {
        let dataObj = {};
        for (const index in doc.data()) {
          // console.log(index);
          dataObj[index] = doc.data()[index];
        }
        dataObj.id = doc.id;
        // console.log(dataObj);
        switch (dataObj.Status) {
          case "Back Log":
            this.backLog.push(dataObj);
            console.log(dataObj);
            break;
          case "To Do":
            this.toDo.push(dataObj);
            break;
          case "Doing":
            this.doing.push(dataObj);
            break;
          case "Done":
            this.done.push(dataObj);
            break;
        }
      });
    });
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#item_handler {
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  display: flex;
  justify-content: space-around;
}

#nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90vw;
  padding: 0px 10px 0px 30px;
  margin: 10px 0px;
}

button {
  width: 100px;
  height: 40px;
  background-color: rgb(0, 119, 255);
  color: antiquewhite;
  border: none;
  border-radius: 10px;
}
</style>
