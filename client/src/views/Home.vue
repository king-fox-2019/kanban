<template>
  <div class="home">
    <card-item v-for="card in cards" :key="card.name" :infocard="card" />
  </div>
</template>

<script>
import Card from "../components/Card.vue";
import db from "../config/firebase";
import Swal from "sweetalert2";

export default {
  name: "Home",
  components: {
    "card-item": Card
  },
  data() {
    return {
      cards: [
        {
          name: "backlog",
          color: "dark",
          title: "Back-Log",
          kanbans: []
        },
        {
          name: "todo",
          color: "primary",
          title: "To-Do",
          kanbans: []
        },
        {
          name: "doing",
          color: "success",
          title: "Doing",
          kanbans: []
        },
        {
          name: "done",
          color: "info",
          title: "Done",
          kanbans: []
        }
      ]
    };
  },
  methods: {
    getData() {
      Swal.showLoading();
      db.collection("listtodo").onSnapshot(querySnapshot => {
        Swal.close();
        this.cards.forEach(el => {
          el.kanbans = [];
        });
        querySnapshot.forEach(doc => {
          this.cards.forEach(element => {
            if (element.name == doc.data().status) {
              element.kanbans.push({ id: doc.id, ...doc.data() });
            }
          });
        });
      });
      console.log(this.cards);
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
