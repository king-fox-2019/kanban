<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="light"
      variant="light"
      fixed="top"
      :sticky="true"
    >
      <b-navbar-brand>(in) Kamban</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-button v-b-modal.newTask class="btn btn-sm">New Task</b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-modal id="newTask" title="Add New Task" hide-footer v-model="show">
      <FormNewTask @hidingModal="show = false" />
    </b-modal>
  </div>
</template>

<script>
import FormNewTask from "@/components/FormNewTask.vue";

export default {
  name: "Header",
  data: function() {
    return {
      show: false
    };
  },
  components: {
    FormNewTask
  }
};
</script>

<style scoped></style>
