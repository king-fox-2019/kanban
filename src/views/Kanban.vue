<template>
  <div>
    <div class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-2">
            {{
            $route.path === '/kanban'
            ? 'Your Kanban List'
            : $store.state.kanban_name
            }}
          </h1>
        </div>
      </div>
      <div class="hero-foot">
        <KanbanTab v-show="/\/kanban\/.+/.test($route.path)"></KanbanTab>
      </div>
    </div>
    <section class="section">
      <div class="columns is-centered">
        <router-view class="column"></router-view>
      </div>
    </section>
  </div>
</template>

<script>
import KanbanTab from '@/components/kanban/KanbanTab.vue'

export default {
  components: {
    KanbanTab
  }
}
</script>

<style></style>
