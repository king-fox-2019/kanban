// style="border:solid 2px red;"
<template>
    <div  style=" height:100vh; width:100%;">
        <!-- <h3>filename:Kanban.vue</h3> -->
        {{ getBoardSpec }}


        <div v-if="boardSpec">
            {{ setInitialPosition }}
            {{ setBoardOrder }}
        </div>

        <!-- group Button -->
        <div>
            <!-- <button type="button" class="btn btn-info btn-jap-navigation" title='add new Board'
            data-toggle="modal" data-target="#addNewBoardModal" data-whatever="@getbootstrap">
                <i class="fas fa-folder-plus" ></i>
            </button> -->
            <!-- <button type="button" class="btn btn-info btn-jap-navigation" title='edit board'>
                <i class="fas fa-th"></i>
            </button> -->
            <button type="button" class="btn btn-info btn-jap-navigation" title='New Task'
            data-toggle="modal" data-target="#addNewTaskModal" data-whatever="@getbootstrap">
                <i class="fas fa-clipboard-list"></i>
            </button>
        </div>
        <!-- end of Group BUtton -->



        <!-- modal "add new board" -->
        <div>

            <div class="modal fade" id="addNewBoardModal" tabindex="-1" role="dialog" aria-labelledby="addNewBoard" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addNewBoard">New Board</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="addNewBoard">
                        <div class="form-group">
                            <label for="boardTitle" class="col-form-label left-label" >Title</label>
                            <input type="text" class="form-control" id="boardTitle" v-model="newBoardTitle" required>
                        </div>
                        <div class="form-group">
                            <label for="boardColor" class="col-form-label left-label">Color</label>
                            <select class="custom-select" id="inputGroupSelect01" v-model="colorSelect" required>
                                <option value="" selected data-default>choose board color</option>
                                <option value="crimson">Red</option>
                                <option value="aqua">Blue</option>
                                <option value="olive">Green</option>
                                <option value="purple">Purple</option>
                                <option value="darkorange">Orange</option>
                            </select>
                        </div>
                        <div class="dropdown-divider"></div>
                        <div class="modal-footer" style="display:inline; border:none">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <input type="submit" class="btn btn-primary" value="Create Board" >
                        </div>
                    </form>
                </div>
                
                </div>
            </div>
            </div>



        </div>
        <!-- end of modal "add new board" -->




        <!-- modal "add new task" -->
        <div>

            <div class="modal fade" id="addNewTaskModal" tabindex="-1" role="dialog" aria-labelledby="addNewTaskModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addNewTaskModalLabel">New task</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="addNewTask">
                        <div class="form-group">
                            <label for="title" class="col-form-label left-label">Title</label>
                            <input type="text" class="form-control" id="title" v-model="newTask.taskTitle" required>
                        </div>
                        <div class="form-group">
                            <label for="point-text" class="col-form-label left-label">Point</label>
                            <input type="number" class="form-control" id="point-text" min=1 v-model="newTask.taskPoint" required>
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label left-label">Message</label>
                            <textarea class="form-control" id="message-text" rows=5 style="resize:none" v-model="newTask.taskMessage" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label left-label">Assign to</label>
                            <input type="test" class="form-control" id="message-text" v-model="newTask.taskAssignTo" required>
                        </div>
                        <div class="dropdown-divider"></div>
                        <div class="modal-footer" style="display:inline; border:none">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <input type="submit" class="btn btn-primary" value="Add New Task" >
                        </div>
                    </form>
                </div>
                
                </div>
            </div>
            </div>


        </div>
        <!-- end of modal "add new task" -->



        <!-- looping board -->
        <div class="japOverFlowing">
            <div class="cardJap1" v-for="(board, x) in boardSpec" :key="x">
                <Board :arrayIndex="x" :boardSpec="board" :fullBoardSpec="boardSpec" :boardOrder="boardOrder"/>
            </div>    
        </div>
        <!-- end of looping board -->




    </div>
</template>





<script>
import Board from '@/components/Board'
import Swal from 'sweetalert2'
import db from '@/config/firebase.js'
import * as firebase from 'firebase';

export default {

    components:{
        Board
    },
    data: function(){
        return{
            newBoardTitle: '',
            colorSelect: '',
            boardLength:0,
            boardSpec:[],
            boardOrder: {},
            firstIndex : null,
            initialPosition: null,
            newTask : {
                        taskTitle: null,
                        taskPoint: null,
                        taskMessage: null,
                        taskAssignTo: null
                      },
        }
    },
    methods: {
        addNewBoard()
          {

            Swal.fire({
                imageUrl: 'https://clipart4biz.com/images/transparent-background-loading-3.gif',
                text: 'Creating Board',
                imageWidth: 200,
                imageHeight: 200,
                showConfirmButton: false
            })

              db.collection('board').add({
                  boardIndex: this.boardSpec.length+1,
                  boardTitle: this.newBoardTitle,
                  color: this.colorSelect,
                  task: []
              })
              .then(docRef=>{
                  console.log('TCL \n============\n ', docRef.id)

                    return Swal.fire(
                        'Creating Board',
                        'Success to create ' + this.newBoardTitle + ' board',
                        'success'
                    )
                    

              })
              .then(()=>{
                    this.newBoardTitle = ''
                    this.colorSelect = ''
                    $('#addNewBoardModal').modal('hide')
                })
              .catch(err=>{
                  console.log('TCL \n============\n ', err)
              })

              
          },
        addNewTask()
          {
             Swal.fire({
                imageUrl: 'https://clipart4biz.com/images/transparent-background-loading-3.gif',
                text: 'registering your task...',
                imageWidth: 200,
                imageHeight: 200,
                showConfirmButton: false
            })


            // storing as array, tapi repot waktu mau diapus array index tertentunya
            // kalo dihapus pake arrayRemove, spec objectny harus sama persis semuannya

            const newTask = 
              {
                belongsTo: this.initialPosition,
                title: this.newTask.taskTitle,
                point: this.newTask.taskPoint,
                message: this.newTask.taskMessage,
                assignTo: this.newTask.taskAssignTo
              }

            db.collection('board').doc(this.initialPosition).update({
                // task: firebase.firestore.FieldValue.arrayUnion(newTask)
                task: firebase.firestore.FieldValue.arrayUnion(newTask)
            })

            // storing as sub-collection, tapi repot setengah mati waktu di get
            // db.collection('board').doc(this.initialPosition).collection('task').add({
            //     belongsTo: this.initialPosition,
            //     title: this.newTask.taskTitle,
            //     point: this.newTask.taskPoint,
            //     message: this.newTask.taskMessage,
            //     assignTo: this.newTask.taskAssignTo
            // })
            .then(docRef=>{
                return Swal.fire(
                    'Registering New Task',
                    'Success',
                    'success'
                )
            })
            .then(()=>{
                this.newTask.taskTitle = ''
                this.newTask.taskPoint = ''
                this.newTask.taskMessage = ''
                this.newTask.taskAssignTo = ''

                $('#addNewTaskModal').modal('hide')
            })
            .catch(err=>{
                console.log('TCL \n============\n error add new task', err)
            })

            
          }
    },
    created(){
        this.$store.dispatch('fetchBoard')
    },
    computed:{
        getBoardSpec()
          { 
               this.boardSpec = this.$store.state.boardSpec
               console.log("TCL: this.boardSpec woiwoiw oiw woi woi di kanban.vue", this.boardSpec)
               
            
            //    this.initialPosition = this.boardSpec[0].boardId
            //    console.log("TCL: this.initialPosition", this.initialPosition)
          },
        setInitialPosition()
          {
              this.initialPosition = this.boardSpec[0].id
            //   this.initialPosition = 'FJ7Hsez5rUzHpFUdMSCi' //board3
              console.log("TCL: this.initialPosition", this.initialPosition)
              
          },
        setBoardOrder()
          {
              let obj = {}
              let objTitle ={}
              for (let x = 0; x < this.$store.state.boardSpec.length; x++)
                {
                    obj[x] = this.$store.state.boardSpec[x].id
                    objTitle[x] = this.$store.state.boardSpec[x].boardTitle
                }
              console.log('TCL \n============\n board order @views/kanban.vue', obj)

              

              this.boardOrder = obj
              this.$store.commit('SET_BOARD_ORDER', obj )
              this.$store.commit('SET_BOARD_ORDER_TITLE', objTitle)
              console.log('TCL see boart order at vuex store\n============\n @views/kanban.vue', this.$store.state.boardOrder)
          }
    },



}
</script>





<style scoped>
.japOverFlowing
{
    /* border: solid 2px blue; */
    overflow: hidden;
    overflow-x: auto;
    display: inline-block;
    
    /* float: left; */
    height: 87vh;
    width: 100%;
    /* overflow-x: auto; */
    white-space: nowrap;
    
}

.cardJap1
{   
    display: inline-block;
    padding: 1rem;
}


.left-label
{
    float:left;
    margin-left:1%;
    font-weight: 700    

}



.btn-jap-navigation
{

     border: dashed 2px black;
    width: 10rem;
    height: 5rem;
    padding: 6px ;
    border-radius: 5px;
    text-align: center;
    font-size: 3rem;
    color: black;
    /* line-height: 1.42857; */
    /* opacity: 10; */
     background-color:rgba(0, 0, 0, 0);
     opacity: 0.4;
    /* background-color: blueviolet; */


}


.btn
{
    margin:1%
}
</style>