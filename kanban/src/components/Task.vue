<template>
    <div class="shadow-sm p-3 bg-white rounded" style="border: dashed  1px grey; margin-top:2%">
        <!-- <h5>filename: components/Task.vue</h5> -->

        {{ getBoardOrder }}
        {{ setCurrentBoardIndex }}

        <!-- <h1>TASK NIH WOI</h1>
        {{ task }} -->
        <div class="card" style="width: 100%;">
            <div class="card-body">
                <!-- <h1>lalala</h1>
                <h1> board ID {{ boardId }}</h1>
                <h2> curretntBoardINdex {{ currentBoardIndex }}</h2>
                <h2> previousBoardIndex {{ previousIndex }}</h2>
                <h2> next board index {{ nextIndex }}</h2>
                <h3>all board order {{ boardOrderTitle }}</h3> -->


                <h3 class="card-title">{{ task.title }}</h3>

                  <div style="text-align:left">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><strong>Point</strong> : {{ task.point }}</li>
                        <li class="list-group-item">{{ task.message }}</li>
                        <li class="list-group-item"><strong>Assign To</strong> : {{ task.assignTo }}</li>
                    </ul>
                </div>
                <div class="d-flex justify-content-between" >
                    <button type="button" class="btn btn-secondary" v-if="previousIndex !== null" @click.prevent="movingTask(previousIndex)">{{ boardOrderTitle[previousIndex] }}</button>
                    
                    <button type="button" class="btn btn-danger" @click.prevent="deleteTask">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                    
                    <button type="button" class="btn btn-primary" v-if="nextIndex" @click.prevent="movingTask(nextIndex)">{{ boardOrderTitle[nextIndex] }}</button>
                </div>
            </div>

        </div>

    </div>




</template>

<script>
import Swal from 'sweetalert2'
import db from '@/config/firebase.js'
import * as firebase from 'firebase';

export default {
    data: function(){
        return{
            currentBoardIndex:null,
            previousIndex:null,
            nextIndex:null,
            boardIndex:null,
            boardOrder: {},
            boardOrderTitle: {}
        }
    },
    props: [
        'boardId',
        'task'
    ],
    methods:{
        deleteTask(){
            Swal.fire({
                title: 'Delete Task',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirm'
            })            
            .then( result=>{
                if(result.value){
                     Swal.fire({
                            imageUrl: 'https://icon-library.net/images/loading-icon-transparent-background/loading-icon-transparent-background-18.jpg',
                            text: 'Deleting Task',
                            imageWidth: 200,
                            imageHeight: 200,
                            showConfirmButton: false
                        })
                        
                    db.collection('board').doc(this.boardId).update({
                        task: firebase.firestore.FieldValue.arrayRemove(this.task)

                    })
                    .then(()=>{
                        Swal.fire(
                        'Success to Delete Task'
                        )
                    })
                }
            })


        },
        movingTask(newBoard){
            Swal.fire({
                title: 'Moving Task',
                text: "Please confirm moving task",
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirm'
            })            
            .then( result=>{
                if(result.value){
                     Swal.fire({
                            imageUrl: 'https://icon-library.net/images/loading-icon-transparent-background/loading-icon-transparent-background-18.jpg',
                            text: 'Moving Task',
                            imageWidth: 200,
                            imageHeight: 200,
                            showConfirmButton: false
                        })
                        
                        return db.collection('board').doc(this.boardOrder[newBoard]).update({
                            task: firebase.firestore.FieldValue.arrayUnion(this.task)
                        })
                        .then(()=>{
                            return db.collection('board').doc(this.boardId).update({
                                task: firebase.firestore.FieldValue.arrayRemove(this.task)
                            })
                        })
                        .then( ()=>{
                            Swal.fire({
                                title:'Success to moving Task',
                                icon: 'success'
                            })
                        })
                        
                }
            })


        }
    },
    computed:{
        getBoardOrder()
          {
              this.boardOrder = this.$store.state.boardOrder
              this.boardOrderTitle = this.$store.state.boardOrderTitle
              console.log("TCL: this.$store.state.boardOrderTitle", this.$store.state.boardOrderTitle)
          },
        setCurrentBoardIndex()
          {
              const values = Object.values(this.boardOrder)
              let invertedBoardOrder = {}
              for( let x =0; x < values.length; x++)
                {
                    invertedBoardOrder[values[x]] = x
                }
              console.log('TCL \n============\n inverted board order', invertedBoardOrder)
              this.currentBoardIndex = invertedBoardOrder[this.boardId]


            // setup previous && next index
              if (this.currentBoardIndex === 0 && this.$store.state.boardLength > 1)
                {
                    this.nextIndex = this.currentBoardIndex + 1
                }
              else if(this.currentBoardIndex === 0 || this.$store.state.boardLength <= 1)
                {
                  return 
                }
              else if (this.currentBoardIndex === this.$store.state.boardLength - 1)
                {
                    this.previousIndex = this.currentBoardIndex - 1
                    this.nextIndex = null
                }
              else
                {
                  this.previousIndex = this.currentBoardIndex - 1
                  this.nextIndex = this.currentBoardIndex + 1
                }

              

            
          }
    }


}
</script>

<style>

</style>