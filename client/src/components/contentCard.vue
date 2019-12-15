<template>
     <b-card :title=item.title style="color:grey ; margin:20px; transform: rotate(2deg);">
    <div class="arrow-right">
    </div>
    <div class="arrow-left">
    </div>
      <hr>
      <p> assigned to : {{item.author}} </p>
      <b-button class="button" @click="removeItem" href="#" variant="primary">delete</b-button>
      <b-button class="button" @click="actionOne" href="#" variant="primary">{{buttonOne}}</b-button>
      <b-button class="button" @click="actionTwo" href="#" variant="primary" v-if="buttonTwo.length">{{buttonTwo}}</b-button>
    </b-card>
</template>

<script>
import database from '../assets/config'
export default {
    name : 'ContentCard',
    data(){
        return {
            buttonOne: '',
            buttonTwo : ''
        }
    },
    props: [
        'item',
        'status'
    ],
    methods: {
        actionOne () {
            database.ref(`/${this.item.id}`).remove()
            database.ref('/').push({
                author : this.item.author,
                title: this.item.title,
                status : this.buttonOne
            })
        },
        actionTwo () {
            database.ref(`/${this.item.id}`).remove()
            database.ref('/').push({
                author : this.item.author,
                title: this.item.title,
                status : this.buttonTwo
            })
        },
        removeItem(){
            database.ref(`/${this.item.id}`).remove()
        }
    },
    created () {
        if(this.item.status == 'Pre-Log'){
            this.buttonOne = 'To-Do'
            
        } else if (this.item.status == 'To-Do'){
            this.buttonOne = 'Pre-Log'
            this.buttonTwo = 'On-Going'
        } else if (this.item.status == 'On-Going'){
            this.buttonOne = 'To-Do'
            this.buttonTwo = 'Finished'
        } else if (this.item.status == 'Finished'){
            this.buttonOne = 'On-Going'
            
        }
    }
}
</script>

<style>

body {
  margin: 20px;
}

.something {
  height: 50px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  width: 50px;
}

.arrow-right {
  background-color: rgb(228, 186, 110);
  box-shadow: 10px 10px 12px -14px rgba(0,0,0,0.47);
  height: 20px;
  left: -20px;
  position: absolute;
  top: 0px;
  width: 70px;
  
  -webkit-transform: rotate(-45deg);
}

.arrow-left {
  background-color: rgb(228, 186, 110);
  box-shadow: 10px 10px 12px -14px rgba(0,0,0,0.47);
  height: 20px;
  left: 300px;
  position: absolute;
  top: 180px;
  width: 70px;
  
  -webkit-transform: rotate(135deg);
}
.button{
    margin: 10px;
}



</style>
