<template>
  <div>
    <b-card-group board>
      <b-card class="card_board" header-class="card_header" :header="title" header-text-variant="white">
         <draggable class="list-group" :list="list" group="people">
          <div v-for="task in list" :key="task.title">
            <Card :task="task" @delete="deleteTask" />
          </div>
        </draggable>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Card from '@/components/Card'

export default {
  name: 'Cardstatus',
  components: {
    draggable,
    Card
  },
  props: ['title', 'list', 'variant'],
  methods: {
    deleteTask (id) {
      this.$emit('delete', id)
    }
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Covered+By+Your+Grace&display=swap");
@import url("https://fonts.googleapis.com/css?family=Montserrat|Roboto&display=swap");
@import url("https://fonts.googleapis.com/css?family=Gelasio&display=swap");

.card_header {
  border: none;
  background-color: rgb(113, 67, 167);
  font-family: 'Gelasio', serif; 
  font-weight: 600;
  font-size: 20px;
  /* font-family: "Roboto", sans-serif; */
}
.card_board {
  border: 1px rgb(139, 215, 238) solid;
}
</style>
