<template>
  <b-card
    :header="task.title"
    style="max-width: 20rem;"
    class="mb-2"
    align="left"
  >
    <b-card-text>
      <span>Point: {{ task.point }}</span>
      <br>
      <span>Assignee: {{ task.assignee }}</span>
    </b-card-text>

    <ModalDetails :task="task"></ModalDetails>
  </b-card>
</template>

<script>
import ModalDetails from './ModalDetails'
export default {
  props: ['task'],
  name: 'CardItem',
  data () {
    return {
    }
  },
  components: {
    ModalDetails
  }
}
</script>

<style>

</style>
