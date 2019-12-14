<template>
  <b-col md="3">
    <b-card
      :border-variant="sendData.color"
      :header="sendData.title"
      :header-bg-variant="sendData.color"
      header-text-variant="white"
      align="left"
    >
      <CardItem v-for="(task, index) in sendData.tasks"
      :key="index" :sendTask="task" />
    </b-card>
  </b-col>
</template>

<script>
import CardItem from './CardItem'

export default {
  name: 'BoardItem',

  data () {
    return {
    }
  },
  props: {
    sendData: {
      type: Object
    }
  },
  components: {
    CardItem
  }
}
</script>

<style>
  .board-wrapper {
    border: 1px solid #b3b3b3;
    border-radius: 4px;
  }
  .board-wrapper .title {
    width: 100%;
    text-align: left;
    padding: 0.8rem 1rem;
    background-color: red;
    color: #ffffff;
  }
</style>
