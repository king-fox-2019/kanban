<template>
  <div>
    <b-navbar toggleable="lg" class="fixed-top" type="dark" variant="info">
      <b-navbar-brand href="#">Kanban</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <!--  -->
          <b-navbar-nav>
            <b-nav-item href v-b-modal.modal>
              <i class="fa fa-plus-square"></i>
              Add Todo
            </b-nav-item>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <Modal></Modal>
  </div>
</template>

<script>
import Modal from "../components/modals";
export default {
  components: {
    Modal
  }
};
</script>

<style></style>
