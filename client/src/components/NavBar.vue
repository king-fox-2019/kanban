<template>
  <nav class="mb-3">
    <div class="left">
      <h3>Kanban Board</h3>
    </div>
    <b-button v-b-modal.modal-new-task variant="primary">New Task</b-button>
    
    <b-modal id="modal-loading" centered hide-header hide-footer>
      <div class="center-loading">
        <b-spinner label="Loading..."></b-spinner>
      </div>
    </b-modal>

    <b-modal id="modal-new-task" centered title="BootstrapVue" hide-footer>
      <b-form>
        <b-form @submit.prevent="onSubmit" @reset="onReset">
          <b-form-group id="input-group-1" label="Task Title:" label-for="input-1">
            <b-form-input 
              id="input-1" 
              v-model="form.title" 
              type="text" 
              required 
              placeholder="Enter task title..."
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Task Description:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="form.description"
              placeholder="Enter description..."
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-3" label="Point:" label-for="input-3">
            <b-form-input
              id="input-3"
              v-model="form.point"
              placeholder="Enter point..."
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-3" label="Assign To:" label-for="input-3">
            <b-form-input
              id="input-3"
              v-model="form.assignTo"
              placeholder="Assign To..."
            ></b-form-input>
          </b-form-group>

          <div class="button-wrapper">
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button class="mr-3" type="reset" variant="danger" >Reset</b-button> 
          </div> 
          
        </b-form>

      </b-form>
    </b-modal>
  </nav>
</template>

<script>
import db from '../../config/firebase'

export default {
  data () {
    return {
      form: {
        title: '',
        description: '',
        point: 0,
        assignTo: ''
      }
    }
  },
  methods: {
    onSubmit () {
      
      this.$bvModal.hide('modal-new-task')
      this.$bvModal.show('modal-loading')
      
      const { title, description, point, assignTo } = this.form;
      
      db.collection("kanban")
        .add({
          title,
          description,
          point,
          assignTo,
          status: 'backlog'
        })
        .then(() => {
          this.$bvModal.hide('modal-loading');

          this.form.title = "";
          this.form.description = "";
          this.form.point = 0;
          this.form.assignTo = "";

        })
        .catch(err => {
          console.log(err);
        });
    },
    onReset () {
      this.title = ''
      this.description = ''
      this.point = ''
      this.assignTo = ''
    }
  }
}
</script>

<style scoped>
  nav {
    height: 4rem;
    display: flex !important;
    flex-direction: row;
    padding: 0 1rem;
    align-items: center;
  }
  .left {
    margin-right: auto;
  }
  .button-wrapper {
    display: flex;
    flex-direction: row-reverse;
  }
  .center-loading {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>