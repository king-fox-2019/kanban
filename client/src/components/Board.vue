<template>
  <div class='d-flex'>
    <div class="col-md-3" v-for='category in categories'>
      <div :class="category" class="card-header">{{category}}</div>
      <div>
        <Card class='card' :category="category"/>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
export default {

  name: 'Board',
  components: {
    Card
  },
  data () {
    return {
      categories: [
        'Backlog',
        'Todo',
        'Ongoing',
        'Finished'
      ]
    }
  }
}
</script>

<style scoped>
  div{
    /*border: 1px solid black;*/
  }
  .Backlog{
    background-color: tomato;
  }
  .Todo{
    background-color: yellow;
  }
  .Ongoing{
    background-color: lightskyblue;
  }
  .Finished{
    background-color: lightgreen;
  }
</style>
