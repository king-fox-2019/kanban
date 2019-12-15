<template>
  <v-app id="app">
    <div class="main-header d-flex">
      <h1>Kanbanify</h1>
    </div>

    <FormAddTask @add-task="addTask" />

    <div class="kanban-container row">
      <div class="col">
        <KanbanContainer 
          @delete-task="deleteTask" 
          @move-task="moveTask" 
          :title="'Backlog'" 
          :tasks="backlogs" 
          :dropdown-categories="backlogCategories"
          :head-color="backlogHeadColor"
          :body-color="backlogColor"
          />
      </div>
      <div class="col">
        <KanbanContainer 
          @delete-task="deleteTask" 
          @move-task="moveTask" 
          :title="'Todo'" 
          :tasks="todos" 
          :dropdown-categories="todoCategories"
          :head-color="todoHeadColor"
          :body-color="todoColor" 
          />
      </div>
      <div class="col">
        <KanbanContainer 
          @delete-task="deleteTask" 
          @move-task="moveTask" 
          :title="'Doing'" 
          :tasks="doings" 
          :dropdown-categories="doingCategories"
          :head-color="doingHeadColor"
          :body-color="doingColor" 
          />
      </div>
      <div class="col">
        <KanbanContainer 
          @delete-task="deleteTask" 
          @move-task="moveTask" 
          :title="'Done'" 
          :tasks="dones" 
          :dropdown-categories="doneCategories"
          :head-color="doneHeadColor" 
          :body-color="doneColor"
          />
      </div>
    </div>
  </v-app>
</template>

<script>
import firebase from "firebase/app";
import FormAddTask from "./components/FormAddTask";
import KanbanContainer from "./components/KanbanContainer";

require("firebase/firestore");

var firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

export default {
  name: "App",

  data: () => ({
    backlogs: [],
    backlogCategories: ["Todo"],
    backlogHeadColor: 'pink',
    backlogColor: "#d14f5a",

    todos: [],
    todoCategories: ["Backlog", "Doing"],
    todoHeadColor: 'orange',
    todoColor: "#db8711",

    doings: [],
    doingCategories: ["Todo", "Done"],
    doingHeadColor: 'blue',
    doingColor: "#2c8ce0",

    dones: [],
    doneCategories: ["Doing"],
    doneHeadColor: 'green',
    doneColor: "#5c9e48"
  }),

  methods: {
    deleteTask: function(id) {
      db.collection("tasks")
        .doc(id)
        .delete()
        .then(function() {
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
    },

    moveTask: function(payload) {
      db.collection("tasks")
        .doc(payload.taskId)
        .update({
          category: payload.category
        })
        .then(function() {
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
          console.error("Error updating document: ", error);
        });
    },

    addTask: function(payload) {
      const input = {
        category: "backlog",
        ...payload
      };
      console.log("ini input", input);

      db.collection("tasks")
        .add(input)
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    }
  },

  created() {
    this.getData()
  },

  computed: {
    getData: function() {
      db.collection("tasks").onSnapshot(querySnapshot => {
        
        let backlogs = [], todos = [], doings = [], dones = []

        querySnapshot.forEach(task => {
          const id = task.id;
          const innerData = task.data();
          const taskData = { id, ...innerData };

          switch (taskData.category.toLowerCase()) {
            case "backlog": {
              backlogs.push(taskData);
              break;
            }
            case "todo": {
              todos.push(taskData);
              break;
            }
            case "doing": {
              doings.push(taskData);
              break;
            }
            case "done": {
              dones.push(taskData);
              break;
            }
          }
        });
        this.backlogs = backlogs
        this.todos = todos
        this.doings = doings
        this.dones = dones
      });
    }
  },

  components: {
    FormAddTask,
    KanbanContainer
  }
};
</script>

<style>
body {
  height: 100vh;
}

.main-header {
  background-color: white;
  padding-top: 1%;
  padding-left: 2%;
  padding-bottom: 1%;
  align-items: flex-start;
  flex-direction: column;
}

.kanban-container {
  padding: 10px 50px;
  background-color: white;
}

.col {
  padding: 10px 25px;
}

</style>
