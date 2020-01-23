<template>
  <b-container style="margin-top:90px; margin-bottom:30px">
    <b-row>
      <b-col>
        <b-card
          class="rounded-0"
          header-class="rounded-0"
          body-class="p-2"
          border-variant="secondary"
          header="Back Log"
          header-bg-variant="secondary"
          header-text-variant="white"
          align="center"
        >
          <Card v-for="backlog in backlogs" :key="backlog.id" :data="backlog"></Card>
        </b-card>
      </b-col>
      <b-col>
        <b-card
          class="rounded-0"
          header-class="rounded-0"
          border-variant="danger"
          body-class="p-2"
          header="Todo"
          header-bg-variant="danger"
          header-text-variant="white"
          align="center"
        >
          <Card v-for="todo in todos" :key="todo.id" :data="todo"></Card>
        </b-card>
      </b-col>
      <b-col>
        <b-card
          class="rounded-0"
          header-class="rounded-0"
          border-variant="warning"
          body-class="p-2"
          header="Doing"
          header-bg-variant="warning"
          header-text-variant="white"
          align="center"
        >
          <Card v-for="doing in doings" :key="doing.id" :data="doing"></Card>
        </b-card>
      </b-col>
      <b-col>
        <b-card
          class="rounded-0"
          header-class="rounded-0"
          body-class="p-2"
          border-variant="success"
          header="Done"
          header-bg-variant="success"
          header-text-variant="white"
          align="center"
        >
          <Card v-for="done in dones" :key="done.id" :data="done"></Card>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import db from "../../config/firestore";
import Card from "../components/cards";

export default {
  components: {
    Card
  },
  data() {
    return {
      color: "",
      title: "",
      detail: "",
      point: 0,
      assignee: "",
      backlogs: [],
      todos: [],
      doings: [],
      dones: []
    };
  },
  methods: {},
  created() {
    let doc = db.collection("todos");
    let observer = doc.onSnapshot(
      docSnapshot => {
        this.backlogs = [];
        this.todos = [];
        this.doings = [];
        this.dones = [];
        docSnapshot.forEach(doc => {
          const status = doc.data().status;
          const data = doc.data();
          data.id = doc.id;
          if (status === "Back Log") this.backlogs.push(data);
          else if (status === "Todo") this.todos.push(data);
          else if (status === "Doing") this.doings.push(data);
          else if (status === "Done") this.dones.push(data);
        });
      },
      err => {
        console.log(`Encountered error: ${err}`);
      }
    );
  }
};
</script>

<style>
</style>
