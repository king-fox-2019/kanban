<template>
  <div id="app">
    <router-view :userEmail="userEmail"/>
  </div>
</template>

<script>
import firebase from '@/configs/firebase'

export default {
  name: 'App',
  data: function () {
    return {
      userEmail: ''
    }
  },
  created () {
    this.userEmail = 'dwadadww'
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        console.log(user.email, 'signed innnnnnnnnn')
      } else {
        // No user is signed in.
        console.log('no user sign innnn')
      }
    })
  }
  // pasang observer disini
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Abel|Barlow|Josefin+Sans|Varela+Round&display=swap');
@import url('https://fonts.googleapis.com/css?family=Courgette&display=swap');
#app {
  height: 100vh;
  /* font-family: 'Courgette', cursive; */
  font-family: 'Josefin Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
