<template>
  <form class>
    <div class="field">
      <label class="label">Email</label>
      <div class="control has-icons-left has-icons-right">
        <!-- <input class="input is-danger" type="email" placeholder="Email input" /> -->
        <input class="input" type="email" placeholder="johnsnow@xkanban.com" v-model="email" />
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
        <input class="input" type="password" placeholder="Password" v-model="password" />
        <!-- <span class="icon is-small is-right">
          <i class="fas fa-exclamation-triangle"></i>
        </span>-->
      </div>
      <!-- <p class="help is-danger">This email is invalid</p> -->
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button
          class="button is-link"
          :class="{'is-loading': isLoading}"
          @click.prevent="onSignIn"
        >Sign In</button>
      </div>
      <!-- <div class="control">
        <button class="button is-link is-light">Cancel</button>
      </div>-->
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
      this.$store
        .dispatch('signIn', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push('/kanban')
        })
        .catch(err => {
          if (err === 'WrongInput')
            Swal.fire('Wrong Input', 'Email/Password is wrong', 'warning')
          this.isLoading = false
        })
    }
  }
}
</script>

<style></style>
