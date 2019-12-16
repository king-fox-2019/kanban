<template>
  <section class="hero is-primary is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title is-size-1">X Kanban</h1>
        <h2 class="subtitle">Your next generation kanban</h2>
      </div>
    </div>
  </section>
</template>

<script>
import auth from '@/config/auth'

export default {
  name: 'home',
  created() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.$store.commit('SET_USER_EMAIL', user.email)
      } else {
        this.$store.commit('SET_USER_EMAIL', null)
      }
    })
  }
}
</script>
