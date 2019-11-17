<template>
  <section class="container">
    <div class="content">
      <button
        class="button is-primary"
        v-show="tab === 'backlog'"
        @click="modalCreate = true"
      >New Task</button>
    </div>
    <div class="tile is-ancestor">
      <div class="tile is-vertical is-parent">
        <article
          class="tile is-child notification is-info"
          v-for="item in arrangedKanban[0]"
          :key="item.id"
          @click="showDetailModal(item)"
        >
          <div class="media">
            <div class="media-content">
              <p class="title is-4">{{ item.data.title }}</p>
              <p class="subtitle is-6">By: {{ item.data.assigner }}</p>
              <div class="content">{{ item.data.desc }}</div>
              <div class="content">
                <p>Assignee: {{item.data.assignee}}</p>
              </div>
            </div>
          </div>
        </article>
      </div>
      <div class="tile is-vertical is-parent">
        <article
          class="tile is-child notification is-info"
          v-for="item in arrangedKanban[1]"
          :key="item.id"
          @click="showDetailModal(item)"
        >
          <div class="media">
            <div class="media-content">
              <p class="title is-4">{{ item.data.title }}</p>
              <p class="subtitle is-6">By: {{ item.data.assigner }}</p>
              <div class="content">{{ item.data.desc }}</div>
              <div class="content">
                <p>Assignee: {{item.data.assignee}}</p>
              </div>
            </div>
          </div>
        </article>
      </div>
      <div class="tile is-vertical is-parent">
        <article
          class="tile is-child notification is-info"
          v-for="item in arrangedKanban[2]"
          :key="item.id"
          @click="showDetailModal(item)"
        >
          <div class="media">
            <div class="media-content">
              <p class="title is-4">{{ item.data.title }}</p>
              <p class="subtitle is-6">By: {{ item.data.assigner }}</p>
              <div class="content">{{ item.data.desc }}</div>
              <div class="content">
                <p>Assignee: {{item.data.assignee}}</p>
              </div>
            </div>
          </div>
        </article>
      </div>
      <div class="tile is-vertical is-parent">
        <article
          class="tile is-child notification is-info"
          v-for="item in arrangedKanban[3]"
          :key="item.id"
          @click="showDetailModal(item)"
        >
          <div class="media">
            <div class="media-content">
              <p class="title is-4">{{ item.data.title }}</p>
              <p class="subtitle is-6">By: {{ item.data.assigner }}</p>
              <div class="content">{{ item.data.desc }}</div>
              <div class="content">
                <p>Assignee: {{item.data.assignee}}</p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>

    <CreateTaskModal :members="members" v-if="modalCreate" @on-close-modal="modalCreate = false"></CreateTaskModal>
    <KanbanDetailModal v-if="detailModal" :task="task" @on-close-modal="detailModal = false"></KanbanDetailModal>
  </section>
</template>

<script>
import CreateTaskModal from '@/components/kanban/CreateTaskModal'
import KanbanDetailModal from '@/components/kanban/KanbanDetailModal'
import db from '../../../config/firebaseconfig'

export default {
  components: {
    CreateTaskModal,
    KanbanDetailModal
  },
  data() {
    return {
      kanban_items: {
        backlog: [],
        todo: [],
        doing: [],
        done: []
      },
      modalCreate: false,
      members: [],
      detailModal: false,
      task: null
    }
  },
  methods: {
    showDetailModal(task) {
      this.task = task
      this.detailModal = true
    }
  },
  computed: {
    tab() {
      return this.$store.state.kanban_tab
    },
    arrangedKanban() {
      const arranger = [[], [], [], []]
      const docRefs = this.kanban_items[this.tab]
      for (let i = 0; i < docRefs.length; i += 4) {
        arranger[0].push({ id: docRefs[i].id, data: docRefs[i].data() })
        if (docRefs[i + 1])
          arranger[1].push({
            id: docRefs[i + 1].id,
            data: docRefs[i + 1].data()
          })
        if (docRefs[i + 2])
          arranger[2].push({
            id: docRefs[i + 2].id,
            data: docRefs[i + 2].data()
          })
        if (docRefs[i + 3])
          arranger[3].push({
            id: docRefs[i + 3].id,
            data: docRefs[i + 3].data()
          })
      }
      return arranger
    }
  },
  created() {
    db.collection('kanbans')
      .doc(this.$route.params.id)
      .get()
      .then(kanbanRef => {
        this.members = kanbanRef.data().members
      })
    db.collection('kanbans')
      .doc(this.$route.params.id)
      .collection('kanban_backlog')
      .onSnapshot(kanbanSnapshot => {
        this.kanban_items.backlog = kanbanSnapshot.empty
          ? []
          : kanbanSnapshot.docs
      })
    db.collection('kanbans')
      .doc(this.$route.params.id)
      .collection('kanban_todo')
      .onSnapshot(kanbanSnapshot => {
        this.kanban_items.todo = kanbanSnapshot.empty ? [] : kanbanSnapshot.docs
      })
    db.collection('kanbans')
      .doc(this.$route.params.id)
      .collection('kanban_doing')
      .onSnapshot(kanbanSnapshot => {
        this.kanban_items.doing = kanbanSnapshot.empty
          ? []
          : kanbanSnapshot.docs
      })
    db.collection('kanbans')
      .doc(this.$route.params.id)
      .collection('kanban_done')
      .onSnapshot(kanbanSnapshot => {
        this.kanban_items.done = kanbanSnapshot.empty ? [] : kanbanSnapshot.docs
      })
  }
}
</script>

<style lang="scss" >
.notification:hover {
  cursor: pointer;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
