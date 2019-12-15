<template>
  <div>
    <b-button id="show-btn" @click="$bvModal.show('bv-modal-example')" variant="outline-info">
      <i class="fas fa-pen"></i> New Task</b-button>

    <b-modal id="bv-modal-example" hide-footer>
      <template v-slot:modal-title>
        Create new Task in <code>KanBan</code>
      </template>
      <div class="d-block text-center">
        <form @submit.stop.prevent="login">
          <div class="form-group">
            <input
              v-model="title"
              class="form-control rounded-0 title"
              placeholder="Title"
            />
          </div>
          <div class="form-group">
            <input
              v-model="description"
              class="form-control rounded-0 title"
              placeholder="Description"
            />
          </div>
          <div class="form-group">
            <input
              v-model="point"
              type="Number"
              class="form-control rounded-0 title"
              placeholder="Point (insert type Number)"
            />
          </div>
          <div class="form-group">
            <input
              v-model="assign"
              class="form-control rounded-0 title"
              placeholder="Assign to"
            />
          </div>
          <b-button class="mt-5" block @click="create" variant="info">
            Add</b-button>
        </form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import swal from 'sweetalert2';
import db from '../config/firebase';

export default {
  data() {
    return {
      title: '',
      description: '',
      point: null,
      assign: '',
    };
  },
  methods: {
    create() {
      if (!this.title || !this.description || !this.point || !this.assign) {
        swal.fire({
          title: 'Error!',
          text: 'Field cannot be empty',
          icon: 'warning',
          confirmButtonText: 'Ok',
        });
      } else {
        db.collection('project').add({
          title: this.title,
          description: this.description,
          point: this.point,
          assign: this.assign,
          status: 'Back Log',
        })
          .then((docRef) => {
            swal.fire({
              title: 'Success!',
              text: 'Task successfully to create',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            this.$bvModal.hide('bv-modal-example');
            this.onReset();
          })
          .catch((err) => {
          });
      }
    },
    onReset() {
      this.title = '';
      this.description = '';
      this.point = null;
      this.assign = '';
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Patrick+Hand&display=swap');

.btn {
  width: 170px !important;
  height: 50px !important;
  font-size: 20px !important;
  color: white !important;
  font-family: 'Lilita One', cursive;
}
.btn:hover {
  background-color: #127887 !important;
}

.title {
  border-radius: 0 !important;
  font-family: 'Patrick Hand', cursive;
  border-color: #18a2b8;
  border-width: 0 0 0 4px;
}

.title:hover {
  border-color: #18a2b8;
  border-radius: 0 !important;
  border-width: 1px 1px 1px 4px;
}

.title:focus {
  border-color: #18a2b8;
  border-radius: 0 !important;
  border-width: 1px 1px 1px 4px;
  box-shadow: none;
}

</style>
