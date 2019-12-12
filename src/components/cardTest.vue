<template>
  <div class="mb-5 mt-3">
    <b-card bg-variant="dark" class="mt-2 mb-2"
      text-variant="white"
      :title="data.title">
      <b-button href="#" @click.prevent="next(data)" variant="primary">NEXT</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
    },
  },
  data() {
    return {
    };
  },
  methods: {
    next(kanban) {
      this.$emit('next', kanban);
    },
  },
};
</script>

<style scoped>
</style>
