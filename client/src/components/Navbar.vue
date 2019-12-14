<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant class="heads">
      <b-navbar-brand href="#" variant="light" class="logos">
        <strong>Kanban</strong>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-button v-b-modal.new-task-modal size="sm" class="my-2 my-sm-0 btn-add" variant="dark">
            <a class="navbar-item" @click.prevent="addpost">
              <span
                class="panel-icon"
                style="font-size: 20px; font-family:'Covered By Your Grace', cursive; font-weight: bolder;"
              >
                <i class="fas fa-edit"></i> add task
              </span>
            </a>
          </b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-modal
      centered
      size="sm"
      id="new-task-modal"
      ref="modal"
      title="Add New Task"
      ok-text="Save"
      @show="emptyData"
      @hidden="emptyData"
      @ok="tosumbit"
      ok-only
    >
      <template v-slot:modal-header style="text-align: center;">
        <!-- Emulate built in modal header close button action -->
        <h5
          style="color: rgb(218, 162, 130) !important; 
                font-weight: bolder; 
                font-size: 20px; 
                text-align: center"
        >Add New Task</h5>
      </template>
      <b-form ref="form" @submit.stop.prevent="submitted" class="addForm">
        <b-form-group label="Title" label-for="title-input" type="text">
          <b-form-input
            id="title-input"
            v-model="addTaskForm.title"
            placeholder="Task title"
            style="font-family: Montserrat, sans-serif; font-size: 12px !important;"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Description" label-for="desc-input">
          <b-form-textarea
            id="desc-input"
            v-model="addTaskForm.desc"
            placeholder="Task description..."
            type="textarea"
            rows="3"
            max-rows="6"
            style="font-family: Montserrat, sans-serif; font-size: 12px !important;"
          ></b-form-textarea>
        </b-form-group>
        <b-form-group label="Point" label-for="point-input">
          <b-form-input
            type="text"
            id="point-input"
            v-model="addTaskForm.point"
            placeholder="Task Point"
            style="font-family: Montserrat, sans-serif; font-size: 12px !important;"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Assign To" label-for="assign-input">
          <b-form-input
            id="assign-input"
            type="text"
            v-model="addTaskForm.assign"
            placeholder="Assign To"
            style="font-family: Montserrat, sans-serif; font-size: 12px !important;"
          ></b-form-input>
        </b-form-group>
      </b-form>
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button
            type="submit"
            variant="dark"
            size="sm"
            class="float-right tombol-sub"
            @click="tosumbit"
          >Save</b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import db from "../../config/firebase";
export default {
  name: "Navbar",
  data() {
    return {
      addTaskForm: {
        title: "",
        desc: "",
        point: 0,
        assign: ""
      }
    };
  },
  methods: {
    emptyData() {
      this.addTaskForm.title = "";
      this.addTaskForm.desc = "";
      this.addTaskForm.assign = "";
    },
    tosumbit(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.submitted();
    },
    submitted() {
      // Push data form to firestore database
      db.collection("tasks")
        .add({
          title: this.addTaskForm.title,
          description: this.addTaskForm.desc,
          point: this.addTaskForm.point,
          assign: this.addTaskForm.assign,
          status: "backlog"
        })
        .then(docRef => {
          // console.log('Document written with ID: ', docRef.id)
          // Hide the modal manually
          this.$nextTick(() => {
            this.$refs.modal.hide();
          });
        })
        .catch(error => {
          console.error("Error adding document: ", error);
          // Hide the modal manually
          this.$nextTick(() => {
            this.$refs.modal.hide();
          });
        });
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Homemade+Apple|Patrick+Hand+SC&display=swap");
@import url("https://fonts.googleapis.com/css?family=Covered+By+Your+Grace&display=swap");
@import url("https://fonts.googleapis.com/css?family=Montserrat|Roboto&display=swap");
.logos {
  font-family: "Homemade Apple", cursive;
  font-size: 40px !important;
  padding: 0px;
  /* border: 2px solid rgb(119, 113, 113); */
}
.btn-add {
  border: none;
  background-color: rgb(125, 175, 159) !important;
}
.heads {
  padding: 30px;
}
.modal-content {
  background-color: rgb(218, 162, 130) !important;
}
.tombol-sub {
  background-color: rgb(218, 162, 130);
  border: none;
  font-family: "Montserrat", sans-serif;
  font-size: 12px !important;
  font-weight: bolder;
}

.addForm {
  background-color: rgb(198, 209, 182);
  font-family: "Montserrat", "Roboto", sans-serif !important;
  font-size: 12px !important;
  font-weight: bolder;
  padding: 20px;
  /* style="font-family: Montserrat, sans-serif; font-size: 12px !important; background-color: rgb(198,209,182) !important" */
}
</style>