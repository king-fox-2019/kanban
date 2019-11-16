<template>
  <div class="modal is-active">
    <div class="modal-background" @click="$emit('on-close-modal')"></div>
    <div class="modal-card">
      <header class="modal-card-head has-background-info">
        <p class="modal-card-title has-text-light">Add New Task</p>
        <button class="delete" aria-label="close" @click="$emit('on-close-modal')"></button>
      </header>
      <section class="modal-card-body has-background-light">
        <form class="container">
          <div class="field">
            <label class="label">Task Title</label>
            <div class="control">
              <input class="input" type="text" placeholder="Do Something" v-model="title" />
            </div>
          </div>
          <div class="field">
            <label class="label">Description</label>
            <div class="control">
              <textarea
                class="textarea has-fixed-size"
                type="text"
                placeholder="Little description about this task..."
                v-model="desc"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Assign To</label>
            <div class="select">
              <select v-model="assignee">
                <option v-for="member of members" :key="member">
                  {{
                  member
                  }}
                </option>
              </select>
            </div>
          </div>
        </form>
      </section>
      <footer class="modal-card-foot has-background-success">
        <button
          class="button is-primary"
          :class="{ 'is-loading': isLoading }"
          @click="createKanban"
        >Add New Task</button>
        <button class="button is-light" @click="$emit('on-close-modal')">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: ['members'],
  data() {
    return {
      title: '',
      desc: '',
      assignee: '',
      isLoading: false
    }
  },
  methods: {
    createKanban() {
      this.isLoading = true
      this.$store
        .dispatch('addTask', {
          id: this.$route.params.id,
          title: this.title,
          desc: this.desc,
          assignee: this.assignee
        })
        .then(() => this.$emit('on-close-modal'))
    }
  }
}
</script>

<style></style>
