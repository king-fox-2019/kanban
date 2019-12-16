<template>
    <div class="overflow-wrap-break-white-space-normal shadow mb-5 bg-white rounded" style="width:25rem; height:80vh;  overflow:hidden">
        <!-- <h5>filename :component/ Board.vue</h5> -->
        
        <!-- header -->
        <div :style="blockStyle">
            <h2 style="color:white;
            font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif
            ">{{ boardTitle }}</h2>    
        </div>
        <!-- end of header -->
        


        <!-- {{ taskList}} -->
        <!-- loaded Tasks -->
        <div class="overflow-wrap-break-white-space-normal" style=" height: calc(100% - 1vh);overflow:scroll; padding:5% 1%" >
            <!-- boardId = {{ boardId }} -->
            {{ getData[0].task }} 
            <div v-for="task in taskList" :key="task">
                <!-- {{ task }} -->
                <Task :boardId="boardId" :task="task"/>

                <!-- {{ boardSpec.id }} <br> -->
                <!-- {{ boardSpec.boardTitle }} -->
                
            </div>
        </div>
        <!-- end of loaded tasks -->
        
    </div>
</template>




<script>
import Task from '@/components/Task'
import db from '@/config/firebase'
export default {

    components:{
        Task
    },
    props:[
        'boardSpec', 
        'fullBoardSpec',
        'boardOrder',
        'arrayIndex'
    ],
    data: function(){
        return {
            blockStyle:
              {
                background: null
              },
            // showAddTaskModal: false,
            blockId: null,
            // blockIndex: null,
            stateBoardSpec:null,
            boardTitle: null,
            taskList: []
        }
    },
    methods:{
        test()
          {
            alert(this.blockStyle.background)
          },
        
        
    },
    computed:{
        getData()
          {
              console.log("TCL: this.$store.state.boardSpec", this.$store.state.boardSpec)
              return this.taskList =  this.$store.state.boardSpec[this.arrayIndex].task
          }
    },
    watch:{
        

      },
    created()
      {
          
        //   console.log("TCL: this.boardSpec.id 1", this.boardSpec.id)
        //   this.boardId = this.boardSpec.id
        //   console.log("TCL: this.boardSpec.id 2", this.boardSpec.id)
        //   console.log("TCL: this.boardId", this.boardId)
        //   this.boardIndex = this.boardSpec.boardIndex
        //   console.log("TCL: this.boardIndex", this.boardIndex)
        //   this.blockStyle.background = this.boardSpec.color
        //   console.log("TCL: this.blockStyle.background", this.blockStyle.background)
        //   this.boardTitle = this.boardSpec.boardTitle
          
        //   this.taskList = this.boardSpec.task

        //   this.$store.dispatch('fetchTask', this.boardId)
            

            this.boardId = this.boardSpec.id
            this.$store.dispatch('fetchTask', this.boardId)

            for(let x = 0; x < this.$store.state.boardSpec.length; x++)
              {
                  if (this.$store.state.boardSpec[x].id === this.boardSpec.id)
                    {
                        this.stateBoardSpec = this.$store.state.boardSpec[x]
                        break
                    }
              }
            console.log("TCL: this.stateBoardSpec", this.stateBoardSpec)
        
          this.boardId = this.stateBoardSpec.id
          this.boardIndex = this.stateBoardSpec.boardIndex
          this.blockStyle.background = this.stateBoardSpec.color
          this.boardTitle = this.stateBoardSpec.boardTitle
          
          this.taskList = this.stateBoardSpec.task

          

            
      }



}
</script>





<style scoped>
.overflow-wrap-break-white-space-normal
{
    overflow-wrap: break-word;
    white-space: normal;
    
}


</style>