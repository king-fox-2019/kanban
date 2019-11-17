<template>
  <div class="modal is-active">
    <div class="modal-background" @click="$emit('on-close-modal')"></div>
    <div class="modal-card">
      <header class="modal-card-head has-background-info">
        <p class="modal-card-title has-text-light">{{task.data.title}}</p>
        <button class="delete" aria-label="close" @click="$emit('on-close-modal')"></button>
      </header>
      <section class="modal-card-body has-background-light" v-if="isLoading !== 'delete'">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">{{ task.data.title }}</p>
            <p class="subtitle is-6">By: {{ task.data.assigner }}</p>
            <div class="content">{{ task.data.desc }}</div>
            <div class="content">
              <p>Assignee: {{task.data.assignee}}</p>
            </div>
          </div>
        </div>
      </section>
      <section class="modal-card-body has-background-light" v-else>
        <div class="hero has-text-centered">
          <div class="hero-body">
            <div class="content">
              <h1 class="title">Are You Sure?</h1>
            </div>
          </div>
          <div class="hero-foot buttons is-centered">
            <button class="button is-success" @click="isLoading = false">Cancel</button>
            <button
              class="button is-danger"
              :class="{'is-loading': deleting}"
              @click="onDelete"
            >Delete</button>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot has-background-success">
        <button class="button is-light" @click="$emit('on-close-modal')">Back</button>
        <button
          class="button is-danger"
          @click="isLoading = 'delete'"
          v-if="isLoading !== 'delete'"
        >Delete</button>
        <button
          class="button is-primary"
          :class="{ 'is-loading': isLoading === 'push' }"
          @click="onPushPhase"
          v-if="isLoading !== 'delete' && task.data.status !== 'done'"
        >Push to next phase</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: ['task'],
  data() {
    return {
      title: '',
      desc: '',
      assignee: '',
      isLoading: false,
      deleting: false
    }
  },
  methods: {
    onDelete() {
      this.deleting = true
      this.$store
        .dispatch('deleteTask', {
          kanban_id: this.$route.params.id,
          status: this.task.data.status,
          id: this.task.id
        })
        .then(() => this.$emit('on-close-modal'))
    },
    onPushPhase() {
      this.isLoading = 'push'
      this.$store
        .dispatch('pushTask', {
          kanban_id: this.$route.params.id,
          status: this.task.data.status,
          id: this.task.id
        })
        .then(() => this.$emit('on-close-modal'))
    }
  }
}
</script>

<style></style>
