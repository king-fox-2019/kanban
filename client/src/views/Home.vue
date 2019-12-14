<template>
  <div>
    <Header />
    <div class="mt-3 px-5">
      <b-row>
        <b-col sm="3" class="mb-4">
          <BacklogBoard
            :todos="backlogTodos"
            boardTitle="Back-log"
            backgroundType="warning"
          />
        </b-col>

        <b-col sm="3" class="mb-4">
          <TodoBoard
            :todos="todoTodos"
            boardTitle="Todo"
            backgroundType="info"
          />
        </b-col>

        <b-col sm="3" class="mb-4">
          <DoingBoard
            :todos="doingTodos"
            boardTitle="Doing"
            backgroundType="primary"
          />
        </b-col>

        <b-col sm="3" class="mb-4">
          <DoneBoard
            :todos="doneTodos"
            boardTitle="Done"
            backgroundType="success"
          />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import BoardTodo from "@/components/BoardTodo.vue";

export default {
  name: "home",
  data: function() {
    return {
      todos: [],
      listener: null
    };
  },
  components: {
    Header,
    BacklogBoard: BoardTodo,
    TodoBoard: BoardTodo,
    DoingBoard: BoardTodo,
    DoneBoard: BoardTodo
  },
  computed: {
    backlogTodos: function() {
      return this.todos.filter(todo => todo.status === "back-log");
    },
    todoTodos: function() {
      return this.todos.filter(todo => todo.status === "todo");
    },
    doingTodos: function() {
      return this.todos.filter(todo => todo.status === "doing");
    },
    doneTodos: function() {
      return this.todos.filter(todo => todo.status === "done");
    }
  },
  created() {
    this.listener = this.$firestore;

    this.listener.collection("todos").onSnapshot(querySnapshot => {
      const result = [];

      querySnapshot.forEach(doc => {
        result.push({
          id: doc.id,
          ...doc.data()
        });
      });
      this.todos = result;
    });
  },
  beforeDestroy() {
    /*
      detach listener
      https://firebase.google.com/docs/firestore/query-data/listen?authuser=0#detach_a_listener
    */
    this.listener();
  }
};
</script>
