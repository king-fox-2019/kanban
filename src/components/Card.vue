<template>
  <div id="container">
    <p style="align-self: center;">{{cardData.Title}}</p>
    <hr />
    <br />
    <p>Point: {{cardData.Point}}</p>
    <br />
    <p>Assigned To: {{cardData['Assigned to']}}</p>
    <br />
    <div>
      <b-button variant="outline-primary" id="showDetail" v-b-modal="cardData.id">Show Detail</b-button>
      <b-modal :id="cardData.id" :title="cardData.Title" size="lg" hide-footer>
        <div class="divInModal">
          <label>Task Description :</label>
          <p class="my-4">{{cardData.Desc}}</p>
        </div>
        <div class="divInModal">
          <label>Point :</label>
          <p class="my-4">{{cardData.Point}}</p>
        </div>
        <div class="divInModal">
          <label>Assigned To :</label>
          <p class="my-4">{{cardData["Assigned to"]}}</p>
        </div>
        <div class="divInModal">
          <label>Status :</label>
          <p class="my-4">{{cardData.Status}}</p>
        </div>
        <hr />
        <div class="buttonInModal" v-if="cardData.Status === 'Back Log'">
          <b-button disable variant="disable"></b-button>
          <b-button variant="outline-danger" @click="deleteTask">Delete</b-button>
          <b-button variant="warning" @click="toUpdate('To Do')">To Do</b-button>
        </div>
        <div class="buttonInModal" v-if="cardData.Status === 'To Do'">
          <b-button variant="danger" @click="toUpdate('Back Log')">Back Log</b-button>
          <b-button variant="outline-danger" @click="deleteTask">Delete</b-button>
          <b-button variant="primary" @click="toUpdate('Doing')">Doing</b-button>
        </div>
        <div class="buttonInModal" v-if="cardData.Status === 'Doing'">
          <b-button variant="warning" @click="toUpdate('To Do')">To do</b-button>
          <b-button variant="outline-danger" @click="deleteTask">Delete</b-button>
          <b-button variant="success" @click="toUpdate('Done')">Done</b-button>
        </div>
        <div class="buttonInModal" v-if="cardData.Status === 'Done'">
          <b-button variant="primary" @click="toUpdate('Doing')">Doing</b-button>
          <b-button variant="outline-danger" @click="deleteTask">Delete</b-button>
          <b-button disable variant="disable"></b-button>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
export default {
  name: "Card",
  components: {},
  props: ["cardData"],
  data() {
    return {
      angka: 0
    };
  },
  methods: {
    deleteTask() {
      this.$bvModal.hide(this.cardData.id);
      db.collection("kanban")
        .doc(this.cardData.id)
        .delete()
        .then(function() {
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
    },
    toUpdate(status) {
      this.$bvModal.hide(this.cardData.id);
      db.collection("kanban")
        .doc(this.cardData.id)
        .update({ Status: `${status}` });
    }
  },
  created() {},
  mounted() {}
};
</script>

<style scoped>
#container {
  display: flex;
  border: 0.1px solid lightgray;
  flex-flow: column wrap;
  border-radius: 10px;
  background-color: white;
  margin: 5px 0px;
  /* justify-content: flex-start; */
  align-items: flex-start;
  padding: 0.8rem;
}
hr {
  display: block;
  width: 100%;
  margin-top: -0.7em;
  margin-bottom: 0.5em;
  margin-left: auto;
  margin-right: auto;
  border-style: inset;
  border-width: 1px;
}
#showDetail {
  width: 100%;
  font-size: 0.8rem;
  border-radius: 5px;
}
.divInModal {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: auto;
  flex-flow: column wrap;
}
.divInModal label {
  margin-bottom: -15px;
}
.buttonInModal {
  display: flex;
  justify-content: space-between;
  padding: auto 15px;
}
</style>