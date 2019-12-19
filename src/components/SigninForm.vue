<template>
  <form class>
    <div class="field">
      <label class="label">Email</label>
      <div class="control has-icons-left has-icons-right">
        <input
          class="input"
          type="email"
          placeholder="johnsnow@xkanban.com"
          v-model="email"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
      </div>
    </div>

    <div class="field">
      <label class="label">Password</label>
      <div class="control has-icons-right">
        <input
          class="input"
          type="password"
          placeholder="Password"
          v-model="password"
        />
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button
          class="button is-link"
          :class="{ 'is-loading': isLoading }"
          @click.prevent="onSignIn"
        >
          Sign In
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      email: '',
      password: '',
      isLoading: false
    }
  },
  methods: {
    onSignIn() {
      this.isLoading = true
      if (!this.email) {
        this.isLoading = false
        return Swal.fire(
          'Email Empty',
          'Email is required for sign in!',
          'warning'
        )
      }
      if (!this.password) {
        this.isLoading = false
        return Swal.fire(
          'Password Empty',
          'Password is required for sign in!',
          'warning'
        )
      }
      this.$store
        .dispatch('signIn', {
          email: this.email,
          password: this.password
        })
        .catch(err => {
          Swal.fire('Error', err.message, 'warning')
          this.isLoading = false
          this.password = ''
        })
    }
  }
}
</script>

<style></style>
