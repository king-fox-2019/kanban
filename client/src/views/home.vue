<template>
  <div class="home">
      <mainHeader></mainHeader>

    <b-container style="max-width: 100vw;">

    <kanbanCard class="base" v-for="(data, index) in taskLists" :key="index" :data="data"></kanbanCard>
    </b-container>
  </div>
  
</template>

<script>


import kanbanCard from '../components/kanbanCard'
import database from '../assets/config'
import mainHeader from '../components/mainHeader'

const taskData = [
  {
    name: 'Pre-Log',
    tasks: []
  },
  {
    name: 'To-Do',
    tasks: []
  },
  {
    name: 'On-Going',
    tasks: []
  },
  {
    name: 'Finished',
    tasks: []
  }
]

var leadsRef = database.ref('/')
leadsRef.on('value', function (snapshot) {
    console.log(snapshot.val(),'from child snap shot nya homeeee')
    taskData[0].tasks = []
    taskData[1].tasks = []
    taskData[2].tasks = []
    taskData[3].tasks = []
    snapshot.forEach(function (childSnapshot) {
        // console.log(childSnapshot.val(),'dari child nya sekarang')
        
        if(childSnapshot.val().status === 'Pre-Log'){
            const obj = childSnapshot.val()
            obj.id = childSnapshot.key
            taskData[0].tasks.push(obj)
        } else if (childSnapshot.val().status === 'To-Do'){
                const obj = childSnapshot.val()
            obj.id = childSnapshot.key
            taskData[1].tasks.push(obj)
        } else if (childSnapshot.val().status === 'On-Going'){
                const obj = childSnapshot.val()
            obj.id = childSnapshot.key
            taskData[2].tasks.push(obj)
        } else {
                const obj = childSnapshot.val()
            obj.id = childSnapshot.key
            taskData[3].tasks.push(obj)
        }
    
    })
    
    console.log(taskData,'taskdataaa')
})

export default {
  name: 'home',
  data: function () {
    return {
      taskLists: taskData
    }
  },
  components: {
    mainHeader,
    kanbanCard
  },
  methods : {
      created () { },
      mounted () { }
  }
}
</script>

<style>
.container{
    display: flex;
    justify-content: space-evenly;
    max-width: 1600px;
    flex-direction: row;
    border: none;
    
}

.base {
    width: 40%;
    margin: 20px;
}


</style>
