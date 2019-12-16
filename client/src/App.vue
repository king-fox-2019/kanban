<template>
  <div id="app" class="bg">
    <Navbar></Navbar>
    <MainPage></MainPage>
    <!-- <router-view /> -->
  </div>
</template>
<script>
import MainPage from "./views/MainPage";
import Navbar from "./components/navbar";

export default {
  components: {
    MainPage,
    Navbar
  }
};
</script>
<style>
.bg {
  height: 100vh;
  overflow-y: scroll;
  background-repeat: repeat;
  background-image: url("https://wallpaperaccess.com/full/1145374.jpg");
  background-position: center;
}
</style>
