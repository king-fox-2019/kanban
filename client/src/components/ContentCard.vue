<template>
<div>
  <b-card :bg-variant="color" :text-variant="textColor || 'white'" :header="title" class="text-left mt-1">
    <b-card-text>Point : {{ point }}</b-card-text>
    <b-card-text>Assigned To : {{ assigne }}</b-card-text>
    <b-button @click="showDetail=true" :variant="colorButton" size="sm" >Show Detail</b-button>
  </b-card>
    <b-modal
      v-model="showDetail"
      :title="'Detail Task '+title+' for '+assigne"
      centered
    >
      <h6 style="font-weight: bold;">Task Description :</h6>
      <p>{{ description }}</p>
      <h6 class="mt-3" style="font-weight: bold;">Point :</h6>
      <p>{{ point }}</p>
      <h6 class="mt-3" style="font-weight: bold;">Status :</h6>
      <p>{{ status }}</p>
      <template class="d-flex" v-slot:modal-footer>
        <div class="d-flex justify-content">
          <b-button
          v-show="status !== 'backlog' && status !== 'doing' && status !== 'done'"
          id="popover-backlog-1" placement="top"
          variant="danger" size="sm" class="ml-3"
          >Back-Log</b-button>

          <b-button
          v-show="status !== 'backlog' && status !== 'todo' && status !== 'done'"
          variant="warning" size="sm" class="ml-3"
          id="popover-todo-1" placement="top"
          >Todo</b-button>

          <b-button
          v-show="status !== 'backlog' && status !== 'todo' && status !== 'doing'"
          id="popover-doing-2" placement="top"
          variant="primary" size="sm" class="ml-3"
          >Doing</b-button>

          <b-button variant="secondary" id="one" placement="top" size="sm" class="ml-3">Delete</b-button>

          <b-button
          v-show="status !== 'todo' && status !== 'doing' && status !== 'done'"
          variant="warning" size="sm" class="ml-3"
          id="popover-todo-2" placement="top"
          >Todo</b-button>

          <b-button
          v-show="status !== 'backlog' && status !== 'doing' && status !== 'done'"
          id="popover-doing-1" placement="top"
          variant="primary" size="sm" class="ml-3"
          >Doing</b-button>

          <b-button
          v-show="status !== 'backlog' && status !== 'todo' && status !== 'done'"
          id="popover-done-1" placement="top"
          variant="success" size="sm" class="ml-3"
          >Done</b-button>

          <!-- POP UP DELETE -->
          <b-popover
            target="one"
            title="Are you sure want to delete this task?"
            triggers="focus"
            placement="top"
            :show.sync="popoverShow"
            >
            <button @click="cancel" type="button" class="btn btn-sm">
                No, Cancel!
            </button>
            <button @click="deleted" type="button" class="btn btn-primary btn-sm ml-2">
                Yes I'm sure!
            </button>
          </b-popover>
        <!-- POP UP LIST -->
        <!-- 1 -->
          <b-popover
            target="popover-todo-1"
            title="Mark this task as To-Do?"
            triggers="focus"
            placement="top"
            :show.sync="popoverShow1"
            >
            <button @click="cancel" type="button" class="btn btn-sm">
                No, Cancel!
            </button>
            <button @click="next('todo')" type="button" class="btn btn-primary btn-sm ml-2">
                Yes I'm sure!
            </button>
          </b-popover>
          <!-- 1.1 -->
          <b-popover
            target="popover-todo-2"
            title="Mark this task as To-Do?"
            triggers="focus"
            placement="top"
            :show.sync="popoverShow1"
            >
            <button @click="cancel" type="button" class="btn btn-sm">
                No, Cancel!
            </button>
            <button @click="next('todo')" type="button" class="btn btn-primary btn-sm ml-2">
                Yes I'm sure!
            </button>
          </b-popover>
          <!-- 2 -->
          <b-popover
            target="popover-backlog-1"
            title="Mark this task as Back-Log?"
            triggers="focus"
            placement="top"
            :show.sync="popoverShow2"
            >
            <button @click="cancel" type="button" class="btn btn-sm">
                No, Cancel!
            </button>
            <button @click="next('backlog')" type="button" class="btn btn-primary btn-sm ml-2">
                Yes I'm sure!
            </button>
          </b-popover>
          <!-- 3 -->
          <b-popover
            target="popover-doing-1"
            title="Mark this task as Doing?"
            triggers="focus"
            placement="top"
            :show.sync="popoverShow3"
            >
            <button @click="cancel" type="button" class="btn btn-sm">
                No, Cancel!
            </button>
            <button @click="next('doing')" type="button" class="btn btn-primary btn-sm ml-2">
                Yes I'm sure!
            </button>
          </b-popover>
          <!-- 3.3 -->
            <b-popover
              target="popover-doing-2"
              title="Mark this task as Doing?"
              triggers="focus"
              placement="top"
              :show.sync="popoverShow5"
            >
            <button @click="cancel" type="button" class="btn btn-sm">
                No, Cancel!
            </button>
            <button @click="next('doing')" type="button" class="btn btn-primary btn-sm ml-2">
                Yes I'm sure!
            </button>
          </b-popover>
          <!-- 4 -->
          <b-popover
            target="popover-done-1"
            title="Mark this task as Done?"
            triggers="focus"
            placement="top"
            :show.sync="popoverShow4"
            >
            <button @click="cancel" type="button" class="btn btn-sm">
                No, Cancel!
            </button>
            <button @click="next('done')" type="button" class="btn btn-primary btn-sm ml-2">
                Yes I'm sure!
            </button>
          </b-popover>
        </div>
      </template>
    </b-modal>
</div>
</template>

<script>
import db from '../config/firebase'

export default {
  props: [
    'title',
    'description',
    'status',
    'point',
    'assigne',
    'id',
    'color',
    'colorButton',
    'textColor'
  ],
  data () {
    return {
      showDetail: false,
      popoverShow: false,
      popoverShow1: false,
      popoverShow2: false,
      popoverShow3: false,
      popoverShow4: false,
      popoverShow5: false
    }
  },
  methods: {
    next (value) {
      let status = null
      switch (value) {
        case 'backlog':
          status = 'backlog'
          break
        case 'todo':
          status = 'todo'
          break
        case 'doing':
          status = 'doing'
          break
        case 'done':
          status = 'done'
          break
        default: break
      }
      db.collection('kanbanList')
        .doc(this.id)
        .update({ status })
        .then(_ => {
          this.$dlg.toast('Update Successfully', { messageType: 'success', closeTime: 2 })
        })
        .catch(err => {
          this.$dlg.toast('errr ' + err, { messageType: 'error' })
        })
      this.showDetail = false
    },
    deleted () {
      db.collection('kanbanList')
        .doc(this.id)
        .delete()
        .then(_ => {
          this.$dlg.toast('Delete Successfully', { messageType: 'success', closeTime: 2 })
        })
        .catch(err => {
          this.$dlg.toast('errr ' + err, { messageType: 'error' })
        })
      this.showDetail = false
    },
    cancel () {
      this.popoverShow = false
      this.popoverShow1 = false
      this.popoverShow2 = false
      this.popoverShow3 = false
      this.popoverShow4 = false
      this.popoverShow5 = false
    }
  }
}
</script>

<style>
</style>
