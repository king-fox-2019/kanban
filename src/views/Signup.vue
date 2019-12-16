<template>
  <div>
    <section class="section hero is-small is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Sign Up</h1>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container columns is-centered">
        <SignupForm class="column is-5"></SignupForm>
      </div>
    </section>
  </div>
</template>

<script>
import SignupForm from '@/components/SignupForm'

export default {
  components: {
    SignupForm
  }
}
</script>

<style></style>
