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

export default {
  components: {
    SigninForm
  }
}
</script>

<style></style>
