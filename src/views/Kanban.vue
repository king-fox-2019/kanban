<template>
  <div>
    <section class="section hero is-small is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">{{ 'Your Kanban List' }}</h1>
        </div>
      </div>
    </section>
    <section class="section">
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
