<template>
  <b-card :title="todoDetail.title" class="mt-2">
    <hr />
    <b-card-text>{{ todoDetail.description }}</b-card-text>
    <b-card-text>
      <small>Assigned to: {{ todoDetail.assignedTo }}</small
      ><br />
      <small class="text-muted">Point: {{ todoDetail.points }}</small>
    </b-card-text>
    <b-card-text>
      <UpdateButton :todoId="todoDetail.id" :status="todoDetail.status" />
    </b-card-text>
  </b-card>
</template>

<script>
import UpdateButton from "@/components/UpdateButton.vue";

export default {
  name: "Todo",
  props: ["todoDetail"],
  components: {
    UpdateButton
  }
};
</script>

<style scoped></style>
