<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  components: {
    Navbar
  }
}

</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');

* {
  font-family: 'Montserrat', sans-serif;
}
</style>
