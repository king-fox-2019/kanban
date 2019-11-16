<template>
  <form class>
    <div class="field">
      <label class="label">Email</label>
      <div class="control has-icons-left has-icons-right">
        <!-- <input class="input is-danger" type="email" placeholder="Email input" /> -->
        <input
          class="input"
          type="email"
          placeholder="johnsnow@xkanban.com"
          v-model="email"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
        <!-- <span class="icon is-small is-right">
          <i class="fas fa-exclamation-triangle"></i>
        </span>-->
      </div>
      <!-- <p class="help is-danger">This email is invalid</p> -->
    </div>

    <div class="field">
      <label class="label">Password</label>
      <div class="control has-icons-right">
        <!-- <input class="input is-danger" type="email" placeholder="Email input" /> -->
        <input
          class="input"
          type="password"
          placeholder="Password"
          v-model="password"
        />
        <!-- <span class="icon is-small is-right">
          <i class="fas fa-exclamation-triangle"></i>
        </span>-->
      </div>
      <!-- <p class="help is-danger">This email is invalid</p> -->
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" @click.prevent="onSignIn">
          Sign In
        </button>
      </div>
      <!-- <div class="control">
        <button class="button is-link is-light">Cancel</button>
      </div>-->
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    onSignIn() {
      this.$store
        .dispatch('signIn', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push('/kanban')
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style></style>
