<template>
  <div id="home">
    <Navbar style="position: sticky;"></Navbar>
    <b-container class="mt-5 gila">
      <h5>drag task to change the status</h5>
      <b-row>
        <b-col>
          <Board title="Back-log" :list="status.backlog" @delete="remove" />
        </b-col>
        <b-col>
          <Board title="To-Do" :list="status.todo" @delete="remove" />
        </b-col>
        <b-col>
          <Board title="Doing" :list="status.doing" @delete="remove" />
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
import Navbar from "@/components/Navbar.vue";
import Board from "@/components/Board.vue";
import db from "../../config/firebase";

export default {
  name: "home",
  components: {
    Navbar,
    Board
  },
  data() {
    return {
      status: {
        backlog: [],
        todo: [],
        doing: [],
        done: []
      },
      modal_form: {
        title: "",
        desc: "",
        assign: ""
      }
    };
  },
  methods: {
    showAll() {
      db.collection("tasks").onSnapshot(querySnapshot => {
        let arrBackLog = [];
        let arrTodo = [];
        let arrDoing = [];
        let arrDone = [];
        querySnapshot.docs.forEach(task => {
          let taskObj;
          switch (task.data().status) {
            case "backlog":
              taskObj = task.data();
              taskObj.id = task.id;
              arrBackLog.push(taskObj);
              break;
            case "todo":
              taskObj = task.data();
              taskObj.id = task.id;
              arrTodo.push(taskObj);
              break;
            case "doing":
              taskObj = task.data();
              taskObj.id = task.id;
              arrDoing.push(taskObj);
              break;
            case "done":
              taskObj = task.data();
              taskObj.id = task.id;
              arrDone.push(taskObj);
              break;
          }
        });
        this.status.backlog = arrBackLog;
        this.status.todo = arrTodo;
        this.status.doing = arrDoing;
        this.status.done = arrDone;
      });
    },
    remove(id) {
      db.collection("tasks")
        .doc(id)
        .delete();
    }
  },
  computed: {
    backlog() {
      return this.status.backlog;
    },
    todo() {
      return this.status.todo;
    },
    doing() {
      return this.status.doing;
    },
    done() {
      return this.status.done;
    }
  },
  watch: {
    backlog: function() {
      // console.log('backlog')
      this.status.backlog.forEach(task => {
        if (task.status !== "backlog") {
          db.collection("tasks")
            .doc(task.id)
            .update({
              status: "backlog"
            });
        }
      });
    },
    todo: function() {
      // console.log('todo')
      this.status.todo.forEach(task => {
        if (task.status !== "todo") {
          db.collection("tasks")
            .doc(task.id)
            .update({
              status: "todo"
            });
        }
      });
    },
    doing: function() {
      // console.log('doing')
      this.status.doing.forEach(task => {
        if (task.status !== "doing") {
          db.collection("tasks")
            .doc(task.id)
            .update({
              status: "doing"
            });
        }
      });
    },
    done: function() {
      // console.log('done')
      this.status.done.forEach(task => {
        if (task.status !== "done") {
          db.collection("tasks")
            .doc(task.id)
            .update({
              status: "done"
            });
        }
      });
    }
  },
  created() {
    this.showAll();
  }
};
</script>

<style scoped>
.gila {
  text-align: center !important;
}
h5 {
  color: white;
  margin: 5px;
  margin-bottom: 15px;
  /* font-style: italic; */
  font-size: 13px;
  border: 1px solid white;
  width: 350px;
  padding: 6px;
  font-weight: bolder;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin: 10px auto;
  margin-bottom: 30px;
}
.mt-5.gila.container {
  background-color: rgba(60, 63, 61, 0.87);
  padding: 20px;
  width: 80%;
  /* display: flex; */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 0px;
}
</style>