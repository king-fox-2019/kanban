<template>
  <div>
    <div class="cards">
      <b-card-group deck class="content">
        <b-card :header="task.title">
          <p>
            <strong>Description:</strong>
            {{ task.description }}
          </p>
          <p>
            <strong>Point:</strong>
            {{ task.point }}
          </p>
          <p>
            <strong>Assigned To:</strong>
            {{ task.assign }}
          </p>
          <b-button class="btn-del" @click="remove" size="sm">Delete</b-button>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "card",
  props: ["task"],
  methods: {
    remove() {
      this.$emit("delete", this.task.id);
    }
  }
};
</script>

<style scoped>
.card-header {
  padding: 10px;
  background-color: rgb(198, 209, 182);
}
.cards {
  padding: 0;
}
.card p {
  margin: 0;
  font-size: 11px;
}
.content {
  margin-bottom: 5px;
}
.btn-del {
  margin: 5px;
  margin-top: 13px;
  font-size: 11px;
  font-weight: bolder;
  background-color: rgb(117, 168, 135);
}
.card-header {
  cursor: grab;
  font-weight: bolder;
  font-size: 13px;
}
.card-header :hover {
  cursor: grab;
}
</style>
