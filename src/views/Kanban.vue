<template>
  <div>
    <div class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{
              $route.path === '/kanban'
                ? 'Your Kanban List'
                : $store.state.kanban_name
            }}
          </h1>
        </div>
      </div>
      <div class="hero-foot">
        <KanbanTab></KanbanTab>
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
import KanbanTab from '@/components/KanbanTab.vue'

export default {
  components: {
    KanbanTab
  }
}
</script>

<style></style>
