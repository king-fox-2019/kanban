<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view id="main" />
    <Footer id="footer"></Footer>
  </div>
</template>

<script>
import '@/config/firebaseconfig'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import auth from './config/auth'

export default {
  components: {
    Navbar,
    Footer
  },
  created() {
    auth.onAuthStateChanged(user => {
      const routePath = this.$route.path
      if (user) {
        this.$store.commit('SET_USER_EMAIL', user.email)
        if (routePath.includes('signin') || routePath.includes('signup'))
          this.$router.replace('/kanban')
      } else {
        this.$store.commit('SET_USER_EMAIL', null)
        if (routePath.includes('kanban')) this.$router.replace('/signin')
      }
    })
  }
}
</script>

<style lang="scss">
@import '~bulma/sass/utilities/_all';

#app {
  position: relative;
  min-height: 100vh;

  #main {
    min-height: 100vh;
  }
  // #footer {
  //   margin-top: 12vh;
  // }
}

$primary: #073b4c;
$primary-invert: findColorInvert($primary);
$info: #fa8334;
$info-invert: findColorInvert($info);
$light: #fffcf2;
$light-invert: findColorInvert($light);
$dark: #31393c;
$dark-invert: findColorInvert($dark);
$success: #ccc5b9;
$success-invert: findColorInvert($success);
$danger: rgb(240, 0, 0);
$danger-invert: findColorInvert($danger);

$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

$table-background-color: $success;
$table-row-hover-background-color: #bbb3a7;
$table-striped-row-even-background-color: #bbb3a7;
$table-striped-row-even-hover-background-color: #a8a196;

$background: $success;

$border: $light;
$border-hover: #bbb3a7;

$colors: (
  'white': (
    $white,
    $black
  ),
  'black': (
    $black,
    $white
  ),
  'light': (
    $light,
    $light-invert
  ),
  'dark': (
    $dark,
    $dark-invert
  ),
  'primary': (
    $primary,
    $primary-invert
  ),
  'info': (
    $info,
    $info-invert
  ),
  'success': (
    $success,
    $success-invert
  ),
  'warning': (
    $warning,
    $warning-invert
  ),
  'danger': (
    $danger,
    $danger-invert
  ),
  'link': (
    $link,
    $link-invert
  )
);

// $warning: $yellow !default;

// $link: $blue !default;
// $link-invert: $blue-invert !default;
// $link-visited: $purple !default;

// $link-hover: $grey-darker !default;
// $link-hover-border: $grey-light !default;

// $link-focus: $grey-darker !default;
// $link-focus-border: $blue !default;

// $link-active: $grey-darker !default;
// $link-active-border: $grey-dark !default;

@import '~bulma';
@import '~buefy/src/scss/buefy';
</style>
