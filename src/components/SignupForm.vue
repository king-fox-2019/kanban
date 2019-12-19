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
          @click.prevent="onSignUp"
        >
          Sign Up
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
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      isLoading: false
    }
  },
  methods: {
    onSignUp() {
      this.isLoading = true
      if (!this.email) {
        this.isLoading = false
        return Swal.fire(
          'Email Empty',
          'Email is required for sign up!',
          'warning'
        )
      }
      if (!this.password) {
        this.isLoading = false
        return Swal.fire(
          'Password Empty',
          'Password is required for sign up!',
          'warning'
        )
      }
      this.$store
        .dispatch('signUp', {
          first_name: this.first_name,
          last_name: this.last_name,
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
