<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">KanBanTe Board</router-link>
      <br>
      <b-button v-b-modal.modal-multi-2>New Task</b-button>

      <b-modal id="modal-multi-2" size="lg" title="First Modal" hide-footer v-model="show">
        <formNya @hideModal="show = false"></formNya>
      </b-modal>
    </div>
    <router-view id="content"/>
  </div>
</template>
<script>
import formNya from '../src/components/form'
export default {
  components: {
    formNya 
  },
  data:function() {
    return {
      show: false
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#content {
  display: flex;
  justify-content: space-around
}
</style>
