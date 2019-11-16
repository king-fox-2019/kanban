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
      <div class="columns is-centered">
        <router-view class="column"></router-view>
      </div>
    </section>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
