<template>
  <form class>
    <div class="field">
      <label class="label">First Name</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="John"
          v-model="first_name"
        />
      </div>
    </div>
    <div class="field">
      <label class="label">Last Name</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Snow"
          v-model="last_name"
        />
      </div>
    </div>

    <!-- <div class="field">
      <label class="label">Username</label>
      <div class="control has-icons-left has-icons-right">
        <input class="input is-success" type="text" placeholder="Text input" value="bulma" />
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
        <span class="icon is-small is-right">
          <i class="fas fa-check"></i>
        </span>
      </div>
      <p class="help is-success">This username is available</p>
    </div>-->

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
        <button class="button is-link" @click.prevent="onSignUp">
          Sign Up
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
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    onSignUp() {
      this.$store
        .dispatch('signUp', {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password
        })
        .then(() => this.$router.push('/kanban'))
        .catch(err => console.log(err))
    }
  }
}
</script>

<style></style>
