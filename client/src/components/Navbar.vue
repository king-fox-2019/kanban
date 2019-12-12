<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">Kamban</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-navbar-nav class="ml-auto">
        <b-collapse id="nav-collapse" is-nav>
          <b-button id="show-btn" @click="showModal">New Task</b-button>

          <b-modal ref="my-modal" hide-footer title="Form New Task">
            <div class="d-block">
              <b-form @submit.prevent="onSubmit" v-if="show">
                <b-form-group
                  id="input-group-1"
                  label="Input Title:"
                  label-for="input-1"
                >
                  <b-form-input
                    id="input-2"
                    v-model="form.title"
                    type="text"
                    required
                    placeholder="Input Title"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-2"
                  label="Input Description:"
                  label-for="input-2"
                >
                  <b-form-input
                    id="input-2"
                    v-model="form.description"
                    type="text"
                    required
                    placeholder="Input Description"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-3"
                  label="Input Point:"
                  label-for="input-3"
                >
                  <b-form-input
                    id="input-3"
                    v-model="form.point"
                    type="number"
                    required
                    placeholder="0"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-4"
                  label="Assigned To:"
                  label-for="input-4"
                >
                  <b-form-input
                    id="input-4"
                    v-model="form.assigned"
                    type="text"
                    required
                    placeholder="assigned to"
                  ></b-form-input>
                </b-form-group>
                <b-button
                  class="mt-3"
                  variant="outline-primary"
                  block
                  type="submit"
                  >Submit Task</b-button
                >
                <b-button
                  class="mt-3"
                  variant="outline-danger"
                  block
                  @click="hideModal"
                  >Close Me</b-button
                >
              </b-form>
            </div>
          </b-modal>
        </b-collapse>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import db from "../config/firebase";
import Swal from "sweetalert2";
export default {
  name: "Navbar",
  data() {
    return {
      form: {
        title: "",
        description: "",
        point: 0,
        assigned: ""
      },
      show: true
    };
  },
  methods: {
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    onSubmit(evt) {
      const { title, description, point, assigned } = this.form;
      evt.preventDefault();
      db.collection("listtodo")
        .add({
          title,
          description,
          point,
          assigned,
          status: "backlog"
        })
        .then(() => {
          this.hideModal();
          this.form.title = "";
          this.form.description = "";
          this.form.point = 0;
          this.form.assigned = "";
          Swal.fire({
            title: "Success!",
            text: "Success Add New Task",
            icon: "success"
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style></style>
