<template>
  <div>
    <ModalForm></ModalForm>
    <AllBoard></AllBoard>
  </div>
</template>

<script>
import AllBoard from '../components/AllBoard'
import ModalForm from '../components/ModalForm'

export default {
  name: 'home',
  data () {
    return {
    }
  },
  components: {
    AllBoard,
    ModalForm
  }
}
</script>
