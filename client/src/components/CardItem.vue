<template>
    <div class="container-fluid mb-3">
        <div class="card">
            <div class="card-header">
                <div> {{cardData.title}} </div>
            </div>
            <div class="card-body">
                <!-- <b-card-text> {{cardData.description}} </b-card-text> -->
                <b-card-text> Point : {{cardData.point}} </b-card-text>
                <b-card-text> Assinged To : {{cardData.assigned}} </b-card-text>
            </div>
            <!-- <div class="card-footer">
                <button class="btn btn-primary btn-sm"> Backlog </button>
                <button class="btn btn-primary"> Delete </button>
                <button class="btn btn-primary"> Doing </button>
            </div> -->
        </div>
    </div>
    
</template>

<script>
// @ is an alias to /src

export default {
  name: 'CardItem',
  props: ['cardData']
}
</script>

<style scoped>
</style>
