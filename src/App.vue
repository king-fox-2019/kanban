<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view id="main" />
    <Footer id="footer"></Footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default {
  components: {
    Navbar,
    Footer
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
// $danger: $red !default;

// $light: $white-ter !default;
// $dark: $grey-darker !default;

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
