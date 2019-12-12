<template>
  <div id="app">
    <navbar @add="addKanban"/>
    <b-container class="mt-5">
      <b-row id="content">
        <b-col class="cardsection" id="backlog" cols="3">
          <h1>BackLog</h1>
          <div id="kanban">
            <backlog v-for="kanban in backlog" :key="kanban.id" :data="kanban" @next="next"/>
          </div>
        </b-col>
        <b-col class="cardsection" id="todo" cols="3">
          <h1>Todo</h1>
          <div id="kanban">
            <todo v-for="kanban in todoData" :key="kanban.id" :data="kanban" @next="next"/>
          </div>
        </b-col>
        <b-col class="cardsection" id="ongoing" cols="3">
          <h1>On Going</h1>
          <div id="kanban">
            <ongoing v-for="kanban in ongoing" :key="kanban.id" :data="kanban" @next="next"/>
          </div>
        </b-col>
        <b-col class="cardsection" id="done" cols="3">
          <h1>Done</h1>
          <div id="kanban">
            <done v-for="kanban in done" :key="kanban.id" :data="kanban" @next="next"/>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import card from '@/components/cardTest.vue';
// import card from '@/components/card.vue';
import navbar from '@/components/navbar.vue';
import db from '../config/firestore';

export default {
  data() {
    return {
      backlog: [],
      todoData: [],
      ongoing: [],
      done: [],
    };
  },
  methods: {
    next(todo) {
      const { id } = todo;
      let nextTo = '';
      if (todo.status === 'done') {
        db.collection('to-do').doc(id).delete();
      }
      if (todo.status === 'backlog') {
        nextTo = 'todo';
      } else if (todo.status === 'todo') {
        nextTo = 'ongoing';
      } else if (todo.status === 'ongoing') {
        nextTo = 'done';
      }
      db.collection('to-do').doc(id).update({
        status: nextTo,
      });
      this.fetchdata();
    },
    fetchdata() {
      db.collection('to-do').onSnapshot((kanbans) => {
        this.backlog = [];
        this.todoData = [];
        this.ongoing = [];
        this.done = [];
        kanbans.forEach((kanban) => {
          const data = kanban.data();
          data.id = kanban.id;
          if (data.status === 'backlog') {
            this.backlog.push(data);
          } else if (data.status === 'todo') {
            this.todoData.push(data);
          } else if (data.status === 'ongoing') {
            this.ongoing.push(data);
          } else {
            this.done.push(data);
          }
        });
      });
    },
    addKanban(data) {
      db.collection('to-do').add({
        status: 'backlog',
        title: data,
      });
    },
  },
  components: {
    navbar,
    backlog: card,
    ongoing: card,
    todo: card,
    done: card,
  },
  mounted() {
    this.fetchdata();
  },
};
</script>

<style>
b-col {
  padding: 1rem;
}
h1 {
  padding: 0.5rem;
  font-family: 'Lilita One', cursive;
}
.cardsection {
  border: 2px solid blueviolet;
  border-radius: 2rem;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
