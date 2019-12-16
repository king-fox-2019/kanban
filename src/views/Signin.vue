<template>
  <div>
    <section class="section hero is-small is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Sign In</h1>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container columns is-centered">
        <SigninForm class="column is-5"></SigninForm>
      </div>
    </section>
  </div>
</template>

<script>
import SigninForm from '@/components/SigninForm'
import auth from '@/config/auth'

export default {
  components: {
    SigninForm
  },
  created() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.$store.commit('SET_USER_EMAIL', user.email)
        this.$router.replace('/kanban')
      }
    })
  }
}
</script>

<style></style>
