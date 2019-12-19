<template>
  <div class="modal is-active">
    <div class="modal-background" @click="$emit('on-close-modal')"></div>
    <div class="modal-card">
      <header class="modal-card-head has-background-info">
        <p class="modal-card-title has-text-light">Create new Todo</p>
        <button
          class="delete"
          aria-label="close"
          @click="$emit('on-close-modal')"
        ></button>
      </header>
      <section class="modal-card-body has-background-light">
        <form class="container" @submit.prevent="createKanban">
          <div class="field">
            <label class="label">Kanban Name</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="X Kanban"
                v-model="kanban_name"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Description</label>
            <div class="control">
              <textarea
                class="textarea has-fixed-size"
                type="text"
                placeholder="Little description about this kanban..."
                v-model="description"
              />
            </div>
          </div>
        </form>
      </section>
      <footer class="modal-card-foot has-background-success">
        <button
          class="button is-primary"
          :class="{ 'is-loading': isLoading }"
          @click="createKanban"
        >
          Create New
        </button>
        <button class="button is-light" @click="$emit('on-close-modal')">
          Cancel
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      kanban_name: '',
      description: '',
      isLoading: false
    }
  },
  methods: {
    createKanban() {
      this.isLoading = true
      if (!this.kanban_name) {
        this.isLoading = false
        return Swal.fire('Title empty', 'Kanban Name required!', 'warning')
      }
      this.$store
        .dispatch('createKanban', {
          kanban_name: this.kanban_name,
          description: this.description
        })
        .then(() => this.$emit('on-close-modal'))
    }
  }
}
</script>

<style></style>
