<template>
  <li class="drag-inner-list items" style="background: #404040; padding:0.1px;">
    <div class="drag-item">
     <h5>{{task.title}}</h5>
    </div>
    <div class="drag-item">
     point : {{task.point}}
    </div>
    <div class="drag-item">
     <a class="waves-effect waves-light btn" :style="`background: ${colorbase};`" @click="seedetail">see detail</a>
    </div>
  </li>
</template>

<script>
export default {
    props:['colorbase','task'],
    methods:{
      seedetail(){
        this.$emit('seedetail', this.task.id)
      }
    }
}
</script>

<style>

</style>