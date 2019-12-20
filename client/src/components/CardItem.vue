<template>
    <div class="container-fluid mb-3">
        <div class="card">
            <div class="card-header text-center">
                <div> {{cardData.title}} </div>
            </div>
            <div class="card-body">
                <!-- <b-card-text> {{cardData.description}} </b-card-text> -->
                <b-card-text> Point : {{cardData.point}} </b-card-text>
                <b-card-text> Assinged To : {{cardData.assigned}} </b-card-text>
            </div>
            <div class="card-footer text-center">
                <button class="btn btn-primary btn-sm" v-b-modal.detailTaskModal> Detail </button>
            </div>
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
