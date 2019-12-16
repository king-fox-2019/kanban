<template>
  <div>
    <b-card bg-variant="light" :header="project.title" class="text-center card mb-3">
      <b-card-text class="desc">Description :</b-card-text>
      <b-card-text class="value">{{project.description}}</b-card-text>
      <b-card-text class="desc">Point :</b-card-text>
      <b-card-text class="value">{{project.point}}</b-card-text>
      <b-card-text class="desc">Assign to :</b-card-text>
      <b-card-text class="value">{{project.assign}}</b-card-text>
      <template v-slot:footer>
        <h6 class="mb-0" style="width:100%; display:flex; justify-content:space-between;">
          <div @click="back(project.id)" v-if="project.status !== 'Back Log'">
            <i class="fas fa-angle-double-left" style="cursor: pointer"></i>
          </div>
          <div @click="destroy(project.id)">
            <i class="fas fa-trash-alt" style="cursor: pointer"></i>
          </div>
          <div v-if="project.status === 'Back Log'"></div>
          <div @click="next(project.id)" v-if="project.status !== 'Done'">
            <i class="fas fa-angle-double-right" style="cursor: pointer"></i></div>
        </h6>
      </template>
    </b-card>
  </div>
</template>

<script>
import swal from 'sweetalert2';
import db from '../config/firebase';

export default {
  components: {
  },
  props: ['project'],
  methods: {
    next(id) {
      const status = {};
      status.newStatus = '';
      if (this.project.status === 'Back Log') status.newStatus = 'To Do';
      else if (this.project.status === 'To Do') status.newStatus = 'Doing';
      else if (this.project.status === 'Doing') status.newStatus = 'Done';
      db.collection('project')
        .doc(id)
        .update({ status: status.newStatus });
      swal.fire({
        title: 'Success!',
        text: 'Task successfully to update',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
    },
    back(id) {
      const status = {};
      status.newStatus = '';
      if (this.project.status === 'To Do') status.newStatus = 'Back Log';
      else if (this.project.status === 'Doing') status.newStatus = 'To Do';
      else if (this.project.status === 'Done') status.newStatus = 'Doing';
      db.collection('project')
        .doc(id)
        .update({ status: status.newStatus });
      swal.fire({
        title: 'Success!',
        text: 'Task successfully to update',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
    },
    destroy(id) {
      swal.fire({
        title: 'Are you sure?',
        text: 'You wont be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.value) {
          db.collection('project')
            .doc(id)
            .delete();
          swal.fire(
            'Deleted!',
            'Task has been deleted.',
            'success',
          );
        }
      });
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Patrick+Hand&display=swap');

.card {
  color: black !important
}
p {
  text-align: left !important;
  margin-bottom: 10px !important;
  margin-left: 10px !important;
}
.desc {
  font-size: 10px !important;
  margin-left: 0px !important;
  margin-bottom: 2px !important
}

.value {
  font-family: 'Patrick Hand', cursive;
  font-size: 20px
}
</style>
