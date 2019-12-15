<template>
<div class="container">
  <div class="row">
    <div class="col mt-3">
      <b-card
          class="card1"
          style="max-width:20rem;"
          border-variant="danger"
          header="Back-Log"
          header-bg-variant="danger"
          header-text-variant="white"
          align="left"
        >
        <content-drag group="listCard" :list="backLog" @start="drag=true" @end="drag=false">
          <div v-for="data in backLog" :key="data.id" >
            <content-card
            class="card1 card2"
            :colorButton="'primary'"
            :color="'danger'"
            :id="data.id"
            :title="data.title"
            :status="data.status"
            :description="data.description"
            :assigne="data.assigne"
            :point="data.point"
            />
          </div>
        </content-drag>
      </b-card>
    </div>
    <div class="col mt-3">
      <b-card
        class="card1"
        style="max-width:20rem;"
        border-variant="warning"
        header="Todo"
        header-bg-variant="warning"
        header-text-variant="black"
        align="left"
        >
        <content-drag group="listCard" :list="todo" @start="drag=true" @end="drag=false">
          <div v-for="data in todo" :key="data.id" >
            <content-card
            class="card1 card2"
            :colorButton="'primary'"
            :color="'warning'"
            :textColor="'black'"
            :id="data.id"
            :title="data.title"
            :status="data.status"
            :description="data.description"
            :assigne="data.assigne"
            :point="data.point"
            />
          </div>
        </content-drag>
      </b-card>
    </div>
    <div class="col mt-3">
      <b-card
        class="card1"
        style="max-width:20rem;"
        border-variant="info"
        header="Doing"
        header-bg-variant="info"
        header-text-variant="white"
        align="left"
        >
        <content-drag group="listCard" :list="doing" @start="drag=true" @end="drag=false">
          <div v-for="data in doing" :key="data.id" >
            <content-card
            class="card1 card2"
            :color="'info'"
            :colorButton="'light'"
            :id="data.id"
            :title="data.title"
            :status="data.status"
            :description="data.description"
            :assigne="data.assigne"
            :point="data.point"
            />
          </div>
        </content-drag>
      </b-card>
    </div>
    <div class="col mt-3">
      <b-card
        class="card1"
        style="max-width:20rem;"
        border-variant="success"
        header="Done"
        header-bg-variant="success"
        header-text-variant="white"
        align="left"
        >
        <content-drag group="listCard" :list="done" @start="drag=true" @end="drag=false">
          <div v-for="data in done" :key="data.id" >
            <content-card
            class="card1 card2"
            :color="'success'"
            :colorButton="'light'"
            :id="data.id"
            :title="data.title"
            :status="data.status"
            :description="data.description"
            :assigne="data.assigne"
            :point="data.point"
            />
          </div>
        </content-drag>
      </b-card>
    </div>
  </div>
</div>
</template>

<script>
import db from '../config/firebase'
import contentCard from './ContentCard'
import draggable from 'vuedraggable'
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      backLog: [],
      todo: [],
      doing: [],
      done: []
    }
  },
  methods: {
    readAllKanban () {
      db.collection('kanbanList')
        .onSnapshot((querySnapshot) => {
          this.backLog = []
          this.todo = []
          this.doing = []
          this.done = []
          querySnapshot.forEach(el => {
            if (el.data().status === 'backlog') {
              this.backLog.push({ id: el.id, ...el.data() })
            } else if (el.data().status === 'todo') {
              this.todo.push({ id: el.id, ...el.data() })
            } else if (el.data().status === 'doing') {
              this.doing.push({ id: el.id, ...el.data() })
            } else if (el.data().status === 'done') {
              this.done.push({ id: el.id, ...el.data() })
            }
          })
        })
    }
  },
  components: {
    'content-card': contentCard,
    'content-drag': draggable
  },
  watch: {
    backLog (value) {
      value.forEach(el => {
        if (el.status !== 'backlog') {
          db.collection('kanbanList')
            .doc(el.id)
            .update({ status: 'backlog' })
            .then(_ => {
              Swal.fire({
                title: 'Ok!',
                text: 'Update Success!',
                imageUrl: 'https://media.giphy.com/media/3oEjHBUwuSGbFS5iAE/giphy.gif',
                imageWidth: 400,
                imageHeight: 200,
                showConfirmButton: false,
                timer: 1200,
                imageAlt: 'Custom image'
              })
            })
            .catch(_ => {
              Swal.fire({
                title: 'Ops!',
                text: 'oWWW!',
                imageUrl: 'https://media.giphy.com/media/8vUEXZA2me7vnuUvrs/giphy.gif',
                imageWidth: 400,
                imageHeight: 200,
                showConfirmButton: false,
                timer: 2000,
                imageAlt: 'Custom image'
              })
            })
        }
      })
    },
    todo (value) {
      value.forEach(el => {
        if (el.status !== 'todo') {
          db.collection('kanbanList')
            .doc(el.id)
            .update({ status: 'todo' })
            .then(_ => {
              Swal.fire({
                title: 'Ok!',
                text: 'Update Success!',
                imageUrl: 'https://media.giphy.com/media/3oEjHBUwuSGbFS5iAE/giphy.gif',
                imageWidth: 400,
                imageHeight: 200,
                timer: 1200,
                showConfirmButton: false,
                imageAlt: 'Custom image'
              })
            })
            .catch(_ => {
              Swal.fire({
                title: 'Opps!',
                text: 'oWWW!',
                imageUrl: 'https://media.giphy.com/media/8vUEXZA2me7vnuUvrs/giphy.gif',
                imageWidth: 400,
                imageHeight: 200,
                showConfirmButton: false,
                timer: 2000,
                imageAlt: 'Custom image'
              })
            })
        }
      })
    },
    doing (value) {
      value.forEach(el => {
        if (el.status !== 'doing') {
          db.collection('kanbanList')
            .doc(el.id)
            .update({ status: 'doing' })
            .then(_ => {
              Swal.fire({
                title: 'Ok!',
                text: 'Update Success!',
                imageUrl: 'https://media.giphy.com/media/3oEjHBUwuSGbFS5iAE/giphy.gif',
                imageWidth: 400,
                imageHeight: 200,
                timer: 1200,
                showConfirmButton: false,
                imageAlt: 'Custom image'
              })
            })
            .catch(_ => {
              Swal.fire({
                title: 'Opps!',
                text: 'oWWW!',
                imageUrl: 'https://media.giphy.com/media/8vUEXZA2me7vnuUvrs/giphy.gif',
                imageWidth: 400,
                imageHeight: 200,
                showConfirmButton: false,
                timer: 2000,
                imageAlt: 'Custom image'
              })
            })
        }
      })
    },
    done (value) {
      value.forEach(el => {
        if (el.status !== 'done') {
          db.collection('kanbanList')
            .doc(el.id)
            .update({ status: 'done' })
            .then(_ => {
              Swal.fire({
                title: 'Ok!',
                text: 'Update Success!',
                imageUrl: 'https://media.giphy.com/media/3oEjHBUwuSGbFS5iAE/giphy.gif',
                imageWidth: 400,
                imageHeight: 200,
                timer: 1200,
                showConfirmButton: false,
                imageAlt: 'Custom image'
              })
            })
            .catch(_ => {
              Swal.fire({
                title: 'Opps!',
                text: 'oWWW!',
                imageUrl: 'https://media.giphy.com/media/8vUEXZA2me7vnuUvrs/giphy.gif',
                imageWidth: 400,
                imageHeight: 200,
                showConfirmButton: false,
                timer: 2000,
                imageAlt: 'Custom image'
              })
            })
        }
      })
    }
  },
  created () {
    this.readAllKanban()
  }
}
</script>

<style>
.card1 {
  transition: 0.8s;
}
.card1:hover {
  box-shadow: 0px 0px 9px 3px rgba(0, 0, 0, 0.356);
}
.card2{
  cursor:grab ;
}
</style>
