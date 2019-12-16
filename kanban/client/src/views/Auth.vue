<template>
  <div>
    <p>register</p>
    <form @submit.prevent="register">
      <input v-model="email" type="email" placeholder="email">
      <input v-model="password" type="password" placeholder="password">
      <button type="submit">submit</button>
    </form>

  <p>login</p>
    <form @submit.prevent="login">
      <input v-model="emailLogin" type="email" placeholder="email">
      <input v-model="passwordLogin" type="password" placeholder="password">
      <button type="submit">submit</button>
    </form>

  </div>
</template>

<script>
import firebase from '@/configs/firebase'
export default {
  name: 'Auth',
  data: function () {
    return {
      email: '',
      password: '',
      emailLogin: '',
      passwordLogin: ''
    }
  },
  methods: {
    register () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push('/')
        })
        .catch(console.log)
    },
    login () {
      firebase.auth().signInWithEmailAndPassword(this.emailLogin, this.passwordLogin)
        .then(() => {
          this.$router.push('/')
        })
        .catch(console.log)
    }
  }
}
</script>

<style>

</style>
