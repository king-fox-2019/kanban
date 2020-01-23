<template>
  <b-card
    class="rounded-0 mt-1"
    header-class="rounded-0"
    :border-variant="color"
    :header="data.title"
    :body-bg-variant="color"
    :header-bg-variant="color"
    header-text-variant="white"
    align="center"
  >
    <b-card-text style="color:white">
      <p>{{ data.detail }}</p>
      <p>{{ data.point }}</p>
      <p>{{ data.assignee }}</p>
      <b-row>
        <b-col md="4">
          <a href @click.prevent="prevStatus" style="color: white">
            <i class="fa fa-arrow-left"></i>
          </a>
        </b-col>
        <b-col md="4">
          <a href @click.prevent="deleteTodo" style="color: white">
            <i class="fa fa-trash-alt"></i>
          </a>
        </b-col>
        <b-col md="4" class="justify-content-end">
          <a href @click.prevent="nextStatus" style="color: white">
            <i class="fa fa-arrow-right"></i>
          </a>
        </b-col>
      </b-row>
    </b-card-text>
  </b-card>
</template>

<script>
import Swal from "sweetalert2";
import db from "../../config/firestore";

export default {
  data() {
    return {
      color: ""
    };
  },
  props: ["data"],
  methods: {
    deleteTodo() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          db.collection("todos")
            .doc(this.data.id)
            .delete()
            .then(() => {
              Swal.fire(
                "Yeay Success!",
                "Status successfully deleted!",
                "success"
              );
            })
            .catch(err => {});
        }
      });
    },
    nextStatus() {
      let newStatus = "";
      if (this.data.status === "Back Log") newStatus = "Todo";
      else if (this.data.status === "Todo") newStatus = "Doing";
      else if (this.data.status === "Doing") newStatus = "Done";
      db.collection("todos")
        .doc(this.data.id)
        .update({
          status: newStatus
        })
        .then(() => {
          Swal.fire("Yeay Success!", "Status successfully updated!", "success");
        })
        .catch(err => {});
    },
    prevStatus() {
      let newStatus = "";
      if (this.data.status === "Todo") newStatus = "Back Log";
      else if (this.data.status === "Doing") newStatus = "Todo";
      else if (this.data.status === "Done") newStatus = "Doing";
      db.collection("todos")
        .doc(this.data.id)
        .update({
          status: newStatus
        })
        .then(() => {
          Swal.fire("Yeay Success!", "Status successfully updated!", "success");
        })
        .catch(err => {});
    }
  },
  created() {
    if (this.data.status === "Back Log") this.color = "secondary";
    else if (this.data.status === "Todo") this.color = "danger";
    else if (this.data.status === "Doing") this.color = "warning";
    else if (this.data.status === "Done") this.color = "success";
  }
};
</script>

<style></style>
