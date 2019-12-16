<template>
  <div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#" class="kanban">
      <i class="fas fa-clipboard-list"></i>KANBAN</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <Create />
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>
        <!-- <img src="https://image.freepik.com/free-vector/student-moving-clock-hands_74855-2538.jpg"
        class="d-inline-block align-center"
        alt="Kitten"> -->

<script>
import CreateModal from './CreateModal.vue';

export default {
  components: {
    Create: CreateModal,
  },
};
</script>
<style scoped>
img {
  height: 70px;;
}
.kanban {
  font-family: 'Lilita One', cursive;
  font-size: 42px
}
</style>
