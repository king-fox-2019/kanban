<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info" style="height:150px; margin-bottom:50px">
            <b-navbar-brand style="margin-left:50px; font-size:36px" href="#">To Do Kan-Ban</b-navbar-brand>

    
             <b-button v-b-modal.modal-prevent-closing :pressed="false" variant="warning" style="height:70px; width:150px;font-size:22px">
             Add To-Do
            </b-button>
        </b-navbar>
          

            <b-modal
            id="modal-prevent-closing"
            ref="modal"
            title="Submit ToDo List"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
            >
            
            <form ref="form" @submit.prevent="handleSubmit">
                <div class="form-group">
                        <label for="exampleInputEmail1">To-do</label>
                        <input v-model="name" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Todo">
                
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Assignee</label>
                    <input v-model="assignee" type="text" class="form-control" id="exampleInputPassword1" placeholder="asssignee">
                </div>

                  <div class="form-group">
                    <label for="exampleFormControlSelect1">status</label>
                    <select v-model='status' class="form-control" id="exampleFormControlSelect1">
                    <option>Pre-Log</option>
                    <option>To-Do</option>
                    <option>On-Going</option>
                    </select>
                </div>
            </form>
            </b-modal>
        </div>
</template>



<script>

import database from '../assets/config'

export default {
    data() {
      return {
        name: '',
        assignee: '',
        status : ''
      }
    },
    methods: {
      
      resetModal() {
        this.name = ''
        this.assignee = ''
      },
      handleOk(bvModalEvt){
          bvModalEvt.preventDefault()
          this.handleSubmit()

      },
      handleSubmit() {
          

          database.ref('/').push({
              author : this.assignee,
              status : this.status,
              title : this.name
          })
          console.log('berhasil update')
        
        // Hide the modal manually
        this.$nextTick(() => {
          this.$refs.modal.hide()
        })
      }
    }
  }
</script>

<style>

</style>