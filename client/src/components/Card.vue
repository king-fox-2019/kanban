<template>
  <div class="card">
    <b-card
      v-if="infocard.name == 'backlog'"
      :header="infocard.title"
      header-text-variant="white"
      header-tag="header"
      :header-bg-variant="infocard.color"
      style="max-width: 20rem;"
    >
      <detailcard-item :infokanban="infocard.kanbans" />
    </b-card>
    <b-card
      v-if="infocard.name == 'todo'"
      :header="infocard.title"
      header-text-variant="white"
      header-tag="header"
      :header-bg-variant="infocard.color"
      style="max-width: 20rem;"
    >
      <detailcard-item :infokanban="infocard.kanbans" />
    </b-card>
    <b-card
      v-if="infocard.name == 'doing'"
      :header="infocard.title"
      header-text-variant="white"
      header-tag="header"
      :header-bg-variant="infocard.color"
      style="max-width: 20rem;"
    >
      <detailcard-item :infokanban="infocard.kanbans" />
    </b-card>
    <b-card
      v-if="infocard.name == 'done'"
      :header="infocard.title"
      header-text-variant="white"
      header-tag="header"
      :header-bg-variant="infocard.color"
      style="max-width: 20rem;"
    >
      <detailcard-item :infokanban="infocard.kanbans" />
    </b-card>
  </div>
</template>

<script>
import DetailCard from "./DetailCard.vue";

export default {
  name: "Card",
  components: {
    "detailcard-item": DetailCard
  },
  props: {
    infocard: {
      type: Object
    }
  }
};
</script>

<style scoped>
.card {
  margin-top: 50px;
  margin-right: 20px;
}
</style>
