<template>
    <div  style=" height:100vh; width:100%;">
        <!-- <h3>filename:Kanban.vue</h3> -->
        {{ getBoardSpec }}
        <!-- group Button -->
        <div>
            <button type="button" class="btn btn-info btn-jap-navigation" title='add new Board'
            data-toggle="modal" data-target="#addNewBoardModal" data-whatever="@getbootstrap">
                <i class="fas fa-folder-plus" ></i>
            </button>
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
                            <input type="text" class="form-control" id="title" required>
                        </div>
                        <div class="form-group">
                            <label for="point-text" class="col-form-label left-label">Point</label>
                            <input type="number" class="form-control" id="point-text" min=1 required>
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label left-label">Message</label>
                            <textarea class="form-control" id="message-text" rows=5 style="resize:none" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="message-text" class="col-form-label left-label">Assign to</label>
                            <input type="test" class="form-control" id="message-text" required>
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
            <div class="cardJap1" v-for="(board, x) in boardSpec.length" :key="x">
                <Board :boardSpec="boardSpec[x]"/> {{ x }} ,,,, {{ board }}
            </div>    
        </div>


        <!-- <div class="japOverFlowing" >
            <div class="cardJap1">
                <Board/>
            </div>
            <div class="cardJap1">
                <Board/>
            </div>
            <div class="cardJap1">
                <Board/>
            </div>
            <div class="cardJap1">
                <Board/>
            </div>
            <div class="cardJap1">
                <Board/>
            </div>
            <div class="cardJap1">
                <Board/>
            </div>
            
            
        </div> -->



    </div>
</template>





<script>
import Board from '@/components/Board'
import Swal from 'sweetalert2'
import db from '@/config/firebase.js'


export default {

    components:{
        Board
    },
    data: function(){
        return{
            newBoardTitle: '',
            colorSelect: '',
            boardLength:0,
            boardSPec:[],
            firstIndex : null,
            initialPosition: null
        }
    },
    methods: {
        addNewBoard()
          {

            Swal.fire({
                imageUrl: 'https://clipart4biz.com/images/transparent-background-loading-3.gif',
                text: 'Creating your room...',
                imageWidth: 200,
                imageHeight: 200,
                showConfirmButton: false
            })

              db.collection('board').add({
                  boardIndex: this.boardSpec.length+1,
                  boardTitle: this.newBoardTitle,
                  color: this.colorSelect
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
            Swal.fire(
                'Adding new Task',
                'success',
                'success'
            )
            .then(result=>{



                $('#addNewTaskModal').modal('hide')
            })
            
          }
    },
    computed:{
        getBoardSpec()
          { 
               this.boardSpec = this.$store.state.boardSpec
               console.log("TCL: this.boardSpec woiwoiw oiw woi woi di kanban.vue", this.boardSpec)

               if (this.boardSpec === 1)
                 {
                     this.initialPosition = this.boardSpec.id
                 }
          }
    },
    created(){
        this.$store.dispatch('fetchData')
    }



}
</script>





<style scoped>
.japOverFlowing
{
    border: solid 2px blue;
    overflow: hidden;
    overflow-x: auto;
    display: inline-block;
    
    /* float: left; */
    height: 90vh;
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