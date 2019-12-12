<template>
  <div class="mb-5 mt-3">
    <b-card bg-variant="dark" class="mt-2 mb-2" v-for="kanban in data"
      :key="kanban.id"
      text-variant="white"
      :title="kanban.title">
      <b-button href="#" @click.prevent="next(kanban)" variant="primary">NEXT</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
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
