<template>
  <nav class="tabs is-large is-boxed">
    <div class="container">
      <ul>
        <li
          :class="{ 'is-active': tab === 'backlog' }"
          @click="tab = 'backlog'"
        >
          <a>Backlog</a>
        </li>
        <li :class="{ 'is-active': tab === 'todo' }" @click="tab = 'todo'">
          <a>Todo</a>
        </li>
        <li :class="{ 'is-active': tab === 'doing' }" @click="tab = 'doing'">
          <a>Doing</a>
        </li>
        <li :class="{ 'is-active': tab === 'done' }" @click="tab = 'done'">
          <a>Done</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    tab: {
      get() {
        return this.$store.state.kanban_tab
      },
      set(val) {
        this.$store.commit('SWITCH_KANBAN_TAB', val)
      }
    }
  }
}
</script>

<style></style>
