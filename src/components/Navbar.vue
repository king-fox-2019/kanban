<template>
  <nav class="navbar is-fixed-top is-info" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img src="../assets/logo.png" width="112" height="28" />
      </router-link>

      <a
        role="button"
        class="navbar-burger burger"
        :class="{ 'is-active': burgerToggle }"
        aria-label="menu"
        aria-expanded="false"
        data-target="kanbanNavbar"
        @click="burgerToggle = !burgerToggle"
        @blur="burgerToggle = false"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="kanbanNavbar" class="navbar-menu" :class="{ 'is-active': burgerToggle }">
      <div class="navbar-start">
        <router-link class="navbar-item has-text-primary" tag="a" to="/kanban">Kanban</router-link>
        <router-link class="navbar-item has-text-primary" tag="a" to="/about">About Creator</router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item" v-if="!$store.state.userEmail">
          <div class="buttons">
            <router-link class="button is-primary" tag="a" to="/signup">
              <strong>Sign Up</strong>
            </router-link>
            <router-link class="button is-light" tag="a" to="/signin">Sign In</router-link>
          </div>
        </div>
        <div class="navbar-item" v-else>
          <div class="buttons">
            <a class="button is-primary" @click.prevent="onSignOut">Sign Out</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      burgerToggle: false
    }
  },
  methods: {
    onSignOut() {
      localStorage.clear()
      this.$store.commit('SET_USER_EMAIL', null)
      this.$router.push('/')
    }
  }
}
</script>

<style></style>
