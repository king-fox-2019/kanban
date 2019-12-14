<template>
  <div class="card-wrapper mb-4 mt-4">
    <b-card
      :header="sendTask.title"
      align="left"
    >
      <b-card-text>Point: {{ sendTask.point }}</b-card-text>
      <b-card-text>Assign To: {{ sendTask.assignTo }}</b-card-text>
      <b-btn variant="outline-primary" @click="showDetail(sendTask.id)">Show Detail</b-btn>
    </b-card>
    <b-modal id="modal-loading" centered hide-header hide-footer>
      <div class="center-loading">
        <b-spinner label="Loading..."></b-spinner>
      </div>
    </b-modal>

    <b-modal :id="sendTask.id" centered title="BootstrapVue" hide-footer>
      <b-form>
        <b-form>
          <b-form-group id="input-group-1" label="Task Title:" label-for="input-1">
            <label>{{ sendTask.title }}</label>
          </b-form-group>

          <b-form-group id="input-group-2" label="Task Description:" label-for="input-2">
            <label>{{ sendTask.description }}</label>
          </b-form-group>

          <b-form-group id="input-group-3" label="Point:" label-for="input-3">
            <label>{{ sendTask.point }}</label>
          </b-form-group>

          <b-form-group id="input-group-3" label="Assign To:" label-for="input-3">
            <label>{{ sendTask.assignTo }}</label>
          </b-form-group>

          <div class="button-wrapper">
            
            <b-button
              v-if="sendTask.status === 'todo'"
              @click="swapBacklog(sendTask.id)"
              variant="outline-danger"
            >Backlog</b-button>

            <b-button
              v-if="sendTask.status === 'backlog' || sendTask.status === 'doing'"
              @click="swapTodo(sendTask.id)"
              variant="outline-warning"
            >Todo</b-button>
            
            <b-button @click="deleteTask(sendTask.id)" variant="danger">Delete</b-button>
            
            <b-button
              v-if="sendTask.status === 'todo' || sendTask.status === 'done'"
              @click="swapDoing(sendTask.id)"
              variant="outline-info"
            >Doing</b-button>

            <b-button v-if="sendTask.status === 'doing'" @click="swapDone(sendTask.id)" variant="outline-success">Done</b-button>
          </div> 
          
        </b-form>

      </b-form>
    </b-modal>
  </div>
</template>
<script>
import db from '../../config/firebase'
export default {
  data() {
    return {
      
    }
  },
  props: {
    sendTask: {
      type: Object
    }
  },
  methods: {
    showDetail(id) {
      this.$bvModal.show(id)
    },
    swapBacklog(id) {
      this.$bvModal.hide(id);
      this.$bvModal.show('modal-loading');
      db.collection("kanban")
        .doc(id)
        .update({
          status: "backlog"
        })
        .then(_ => {
          this.$bvModal.hide('modal-loading');
        })
        .catch(err => {
          console.log(err);
        });
    },
    swapTodo(id) {
      this.$bvModal.hide(id);
      this.$bvModal.show('modal-loading');
      db.collection("kanban")
        .doc(id)
        .update({
          status: "todo"
        })
        .then(_ => {
          this.$bvModal.hide('modal-loading');
        })
        .catch(err => {
          console.log(err);
        });
    },
    swapDoing(id) {
      this.$bvModal.hide(id);
      this.$bvModal.show('modal-loading');
      db.collection("kanban")
        .doc(id)
        .update({
          status: "doing"
        })
        .then(_ => {
          this.$bvModal.hide('modal-loading');
        })
        .catch(err => {
          console.log(err);
        });
    },
    swapDone(id) {
      this.$bvModal.hide(id);
      this.$bvModal.show('modal-loading');
      db.collection("kanban")
        .doc(id)
        .update({
          status: "done"
        })
        .then(_ => {
          this.$bvModal.hide('modal-loading');
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteTask(id) {
      this.$bvModal.hide(id);
      this.$bvModal.show('modal-loading');
      db.collection("kanban")
        .doc(id)
        .delete()
        .then(_ => {
          this.$bvModal.hide('modal-loading');
        })
        .catch(function(err) {
          console.error(err);
        });

    }
  }
}
</script>
<style scoped>
  .button-wrapper {
    display: flex;
    justify-content: space-between;
  }
</style>
