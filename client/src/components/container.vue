<template>
  <div>
     <b-card
        border-variant="secondary"
        :header="header"
        :header-bg-variant="bgVariant"
        header-text-variant="white"
        align="center"
        style="min-width: 15rem;"
      >
        <card :todos="todos"></card>
      </b-card>
  </div>
</template>

<script>
import card from '@/components/card.vue'

export default {
  components:{
    card
  },
  props:{
    header:{
      type:String
    },
    bgVariant:{
      type:String
    },
    todos:{
      typd:Array
    }
  }
}
</script>

<style scoped>
div{
  width:100%
}
</style>