<template>
  <div>
    <b-modal id="modal" centered title="Add Todo" ok-title="Add">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="title-todo" label="Title" label-for="title">
          <b-form-input id="title" v-model="title" type="text" required placeholder="Enter title"></b-form-input>
        </b-form-group>

        <b-form-group id="detail-todo" label="Detail" label-for="detail">
          <b-form-input
            id="detail"
            v-model="detail"
            type="text"
            required
            placeholder="Enter detail"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="point-todo" label="Point" label-for="point">
          <b-form-input id="point" v-model="point" type="number" required placeholder="Enter point"></b-form-input>
        </b-form-group>

        <b-form-group id="assignee-todo" label="Assignee" label-for="assignee">
          <b-form-input
            id="assignee"
            v-model="assignee"
            type="text"
            required
            placeholder="Enter assignee"
          ></b-form-input>
        </b-form-group>
      </b-form>
      <template v-slot:modal-footer="{ ok, cancel, hide }">
        <b-button size="sm" variant="secondary" @click="onReset">Reset</b-button>
        <b-button size="sm" variant="danger" @click="cancel()">Cancel</b-button>
        <b-button size="sm" variant="success" @click="addTodo()">Add</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import db from "../../config/firestore";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      title: "",
      detail: "",
      point: 0,
      assignee: "",
      show: true
    };
  },
  components: {},
  methods: {
    addTodo() {
      if (this.title && this.detail && this.assignee) {
        db.collection("todos")
          .add({
            title: this.title,
            detail: this.detail,
            point: this.point,
            assignee: this.assignee,
            status: "Back Log"
          })
          .then(() => {
            this.$bvModal.hide("modal");
            this.title = "";
            this.detail = "";
            this.point = 0;
            this.assignee = "";
            // Trick to reset/clear native browser form validation state
            this.show = false;
            this.$nextTick(() => {
              this.show = true;
            });
          })
          .catch(err => {
            console.log(err);
          });
      } else if (!this.title || !this.detail || !this.assignee) {
        Swal.fire({
          title: "Error validation!",
          text: "All fields must be filled",
          icon: "warning",
          confirmButtonColor: "#3085d6"
        });
      }
    },
    onSubmit(evt) {
      evt.preventDefault();
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.title = "";
      this.detail = "";
      this.point = 0;
      this.assignee = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

<style></style>
