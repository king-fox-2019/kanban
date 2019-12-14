<template>
  <div>
    <h1>(in) Kamben</h1>
  </div>
</template>

<script>
export default {
  name: "home",
  data: function() {
    return {
      todos: [],
      listener: null
    };
  },
  created() {
    this.listener = this.$firestore;

    this.listener.collection("todos").onSnapshot(querySnapshot => {
      const result = [];

      querySnapshot.forEach(doc => {
        result.push({
          id: doc.id,
          ...doc.data()
        });
      });
      this.todos = result;
    });
  },
  beforeDestroy() {
    /*
      detach listener
      https://firebase.google.com/docs/firestore/query-data/listen?authuser=0#detach_a_listener
    */
    this.listener();
  }
};
</script>
