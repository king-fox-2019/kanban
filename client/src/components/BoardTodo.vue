<template>
  <div class="card">
    <!-- <div class="header bg-warning text-center p-1"> -->
    <div :class="`header bg-${backgroundType} text-center p-1`">
      <h3>{{ boardTitle }}</h3>
    </div>
    <div class="card-body">
      <Todo v-for="todo in todos" :todoDetail="todo" :key="todo.id" />
    </div>
  </div>
</template>

<script>
import Todo from "@/components/Todo.vue";

export default {
  name: "BoardTodo",
  props: ["todos", "boardTitle", "backgroundType"],
  components: {
    Todo
  }
};
</script>

<style scoped></style>
