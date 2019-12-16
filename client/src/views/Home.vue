<template>
  <div class="home">
    <Navbar />
    <div class="container-fluid mt-4">
      <div class="row">
        <div class="col-sm">
          <b-card bg-variant="danger" text-variant="white"
          header="Back Log" class="text-center card">
            <Card v-for="(project, index) in backlog" :key="index" :project="project" />
          </b-card>
        </div>
        <div class="col-sm">
          <b-card bg-variant="warning" text-variant="white"
          header="To Do" class="text-center card">
            <Card v-for="(project, index) in todo" :key="index" :project="project" />
          </b-card>
        </div>
        <div class="col-sm">
          <b-card bg-variant="primary" text-variant="white"
          header="Doing" class="text-center card">
            <Card v-for="(project, index) in doing" :key="index" :project="project" />
          </b-card>
        </div>
        <div class="col-sm">
          <b-card bg-variant="success" text-variant="white"
          header="Done" class="text-center card">
            <Card v-for="(project, index) in done" :key="index" :project="project" />
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Card from '../components/Card.vue';
import db from '../config/firebase';

export default {
  components: {
    Navbar, Card,
  },
  data() {
    return {
      backlog: [],
      todo: [],
      doing: [],
      done: [],
    };
  },
  methods: {
    getAllData() {
      db.collection('project')
        .onSnapshot((projects) => {
          this.backlog = [];
          this.todo = [];
          this.doing = [];
          this.done = [];
          projects.forEach((element) => {
            const data = {
              ...element.data(),
              id: element.id,
            };
            if (data.status === 'Back Log') this.backlog.push(data);
            else if (data.status === 'To Do') this.todo.push(data);
            else if (data.status === 'Doing') this.doing.push(data);
            else if (data.status === 'Done') this.done.push(data);
          });
        });
    },
  },
  created() {
    this.getAllData();
  },
};
</script>

<style scoped>
  Card {
    padding: 0px !important;
    margin: 0px !important;
  }

  .card:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

</style>
