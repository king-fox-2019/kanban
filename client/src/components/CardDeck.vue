<template>
    <b-col cols="12" sm="6" md="3" lg="3">
        <div class="card-deck">
        <div class="card">
            <div class="card-header">
            <div> {{title}} </div>
            </div>
            <div class="card-body">
            <div class="card-deck d-flex flex-column">
                <CardItem v-for="card of cards" :cardData="card" :key="card.id" />
            </div>
            </div>
        </div>
        </div>
    </b-col>
</template>

<script>
// @ is an alias to /src
import CardItem from '../components/CardItem.vue'

export default {
  name: 'CardDeck',
  components: {
    CardItem 
},
  props: ['title', 'cards']
}
</script>

<style scoped>
</style>
