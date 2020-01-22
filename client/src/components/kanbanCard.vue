<template>
  <div class="card" style="border:none;">
 

    <b-card v-if="data.name === 'Pre-Log'" bg-variant="dark" text-variant="white" :header=data.name class="text-center">
    <ContentCard v-for="(item) in data.tasks" :key="item.id" :item="item" :status="data.status">
    </ContentCard>
    </b-card>

     <b-card v-if="data.name === 'To-Do'" bg-variant="warning" text-variant="white" :header=data.name class="text-center">
    <ContentCard v-for="(item) in data.tasks" :key="item.id" :item="item" :status="data.status">
    </ContentCard>
    </b-card>

     <b-card v-if="data.name === 'On-Going'" bg-variant="info" text-variant="white" :header=data.name class="text-center">
    <ContentCard v-for="(item) in data.tasks" :key="item.id" :item="item" :status="data.status">
    </ContentCard>
    </b-card>

     <b-card v-if="data.name === 'Finished'" bg-variant="success" text-variant="white" :header=data.name class="text-center">
    <ContentCard v-for="(item) in data.tasks" :key="item.id" :item="item" :status="data.status">
    </ContentCard>
    </b-card>
  </div>
</template>

<script>

import ContentCard from '../components/contentCard'

export default {
  name : 'kanbanCard',
  data(){
    return {
      page : ''
    }
  },
  components : {
    ContentCard
  },
  data : function () {
    return {}
  },
  props : ['data'],
  created () {
    this.cardTitle = this.title
    // console.log(data.tasks,'dari card title')
  }

}
</script>

<style>
.card{
  
}

</style>
