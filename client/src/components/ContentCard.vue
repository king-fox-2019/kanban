<template>
    <div class="card w-100">
        <div class="card-header">{{ taskDetail.title }}</div>
        <div class="card-body text-left">
            <p class="card-title">Assigned To : {{ taskDetail.assigned_to }}</p>
            <p class="card-subtitle mb-2 text-muted">Point : {{ taskDetail.point }}</p>
            <button class="btn btn-primary btn-sm" v-on:click.prevent="showDetail(taskDetail.id)" data-toggle="modal" data-target="#showDetail">Show Details</button>
        </div>
    </div>
</template>

<script>

export default {
  props: ['taskDetail'],
  data () {
    return {}
  },
  methods: {
    showDetail (id) {
      console.log('masuk di component function')
      this.$emit('edit-modal', id)
    }
  }
}
</script>

<style>

</style>
