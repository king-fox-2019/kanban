<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant class="heads">
      <b-navbar-brand href="#" variant="light" class="logos">
        <strong>Puyow</strong>
        <span v-if="user">{{user.email}}</span>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-button v-b-modal.new-task-modal size="sm" class="my-2 my-sm-0 add-btn" variant="dark">
            <a class="navbar-item" @click.prevent="addpost">
              <span class="panel-icon" style="font-size: 20px; font-family: 'Lobster Two', cursive; font-weight: bolder;">
                <i class="fas fa-pen-fancy"></i> drop a task
              </span>
            </a>
          </b-button>
          <b-button @click="logout">
            logout
          </b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-modal centered size="sm" id="new-task-modal" ref="modal" title="Be Productive" ok-text="Submit" @show="emptyData" @hidden="emptyData" @ok="tosubmit" ok-only>
    
      <template v-slot:modal-header style="text-align: center;">
        <!-- Emulate built in modal header close button action -->
        <h5 style="color: rgb(171, 155, 145) !important; font-weight: bolder; font-size: 20px; text-align: center" >Be Productive!</h5>
      </template>
      <b-form ref="form" @submit.stop.prevent="submission" class="addForm">
        <b-form-group label="Title" label-for="title-input" type="text">
          <b-form-input id="title-input" v-model="title" placeholder="Todo title" style="font-family: 'Sofia', cursive; font-size: 12px !important;" ></b-form-input>
        </b-form-group>
        <b-form-group label="Description" label-for="description-input">
          <b-form-textarea id="description-input" v-model="description" placeholder="Task description" type="textarea" rows="3" max-rows="4" style="font-family: 'Sofia', cursive; font-size: 12px !important;"></b-form-textarea>
        </b-form-group>
        <b-form-group label="Assignee" label-for="assignee-input">
          <b-form-input id="assignee-input" type="text" v-model="assignee" placeholder="Assignee" style="font-family: 'Sofia', cursive; font-size: 12px !important;"></b-form-input>
        </b-form-group>
      </b-form>
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button type="submit" variant="dark" size="sm" class="float-right submit-button" @click="onSubmit">Submit</b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import firebase from '@/configs/firebase'
const db = firebase.firestore()
export default {
  name: 'Navbar',
  props: ['user'],
  data () {
    return {

      title: '',
      description: '',
      assignee: ''
    }
  },
  methods: {
    emptyData () {
      this.title = ''
      this.description = ''
      this.assignee = ''
    },
    onSubmit (bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.submission()
    },
    submission () {
      // Push data form to firestore database
      db.collection('tasks')
        .add({
          title: this.title,
          description: this.description,
          assignee: this.assignee,
          status: 'backlog'
        })
        .then(docRef => {
          // console.log('Document written with ID: ', docRef.id)
          // Hide the modal manually
          this.$nextTick(() => {
            this.$refs.modal.hide()
          })
        })
        .catch(error => {
          console.error('Error adding document: ', error)
          // Hide the modal manually
          this.$nextTick(() => {
            this.$refs.modal.hide()
          })
        })
    },
    logout () {
      firebase.auth().signOut()
        .then(() => {
          this.$router.push('/register')
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Lobster+Two&display=swap');
@import url('https://fonts.googleapis.com/css?family=Sofia&display=swap');

@import url("https://fonts.googleapis.com/css?family=Homemade+Apple|Patrick+Hand+SC&display=swap");
@import url("https://fonts.googleapis.com/css?family=Covered+By+Your+Grace&display=swap");
@import url("https://fonts.googleapis.com/css?family=Montserrat|Roboto&display=swap");
.logos {
  font-family: 'Sofia', cursive;
  font-size: 30px !important;
}
.add-btn {
  border: none;
  background-color: rgb(143, 127, 189) !important;
}
.heads {
  padding: 30px;
}
.modal-content {
  background-color: rgb(163, 187, 214) !important;
}
.submit-button {
  background-color: rgb(88, 108, 114);
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
