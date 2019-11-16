<template>
  <div>
    <div class="container" v-if="kanbanList.length <= 0">
      <div class="content has-text-centered">
        <h5 class="title is-5">Your Kanban list is empty...</h5>
      </div>
    </div>
    <button class="button is-primary" @click="modalCreate = true">
      Create new
    </button>
    <div class="table-container" v-if="kanbanList.length > 0">
      <table class="table is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Kanban Name</th>
            <th>Description</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="kanban in kanbanList"
            :key="kanban.id"
            @click="onKanbanClick(kanban)"
          >
            <td>{{ kanban.kanban_name }}</td>
            <td>{{ kanban.description }}</td>
            <td>{{ kanban.members }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <CreateKanbanModal
      v-if="modalCreate"
      @on-close-modal="modalCreate = false"
    ></CreateKanbanModal>
  </div>
</template>

<script>
import CreateKanbanModal from '@/components/kanban/CreateKanbanModal'

export default {
  components: {
    CreateKanbanModal
  },
  data() {
    return {
      modalCreate: false
    }
  },
  methods: {
    onKanbanClick(kanban) {
      this.$router.push(`/kanban/${kanban.id}`)
    }
  },
  computed: {
    kanbanList() {
      return this.$store.state.kanbanList
    }
  },
  created() {
    this.$store.dispatch('getKanbans')
  }
}
</script>

<style lang="scss">
tbody tr:hover {
  cursor: pointer;
}
</style>
