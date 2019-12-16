<template>
    <div>
        <sui-list>
            <sui-list-item v-for="card in data" :key="card.id">
                <card
                        :id="card.id"
                        :title="card.data.title"
                        :content="card.data.content"
                        :action="card.data.action"
                        :date="card.data.date"
                        :imgProfile="card.data.imgProfile"
                        @loadNewData="loadNewData"
                />
            </sui-list-item>
        </sui-list>
    </div>
</template>

<script>
    import card from './card'

    export default {
        name: "cardContainer",
        props: {
            data: Array
        },
        methods: {
        },
        components: {
            card
        }
    }
</script>

<style scoped>

</style>