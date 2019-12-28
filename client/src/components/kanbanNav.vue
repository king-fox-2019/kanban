<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark static-top mb-3">
    <div class="container">
      <router-link to="/">
        <a :class="['navbar-brand']">My Kanban Application</a>
      </router-link>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <button class="btn btn-primary" v-b-modal.addTaskModal> Add Task </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'KanbanNav'
}
</script>

<style scoped>
</style>
