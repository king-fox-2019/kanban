<template>
  <div id="holder">
    <b-card
      border-variant="grey"
      :header="bindData[0]"
      :header-bg-variant="bindData[1]"
      header-text-variant="white"
      align="center"
    >
      <!-- <b-card-text>apaan sih</b-card-text> -->
      <div v-for="(document, index) in bindData[2]" :key="index">
        <Card :cardData="document"/>
      </div>
    </b-card>
  </div>
</template>

<script>
import Card from "./Card.vue";

export default {
  components: {
    Card
  },
  props: ["bindData"],
  data() {
    return {};
  },
  mounted(){
  }
};
</script>

<style scoped>
#holder {
  width: 20%;
}
</style>