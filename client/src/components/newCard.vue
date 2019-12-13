<template>
    <div>
        <sui-button
                primary content="New Task"
                icon="plus"
                @click="showNewCardForm(true)"
        />
        <div id="newCardForm" v-if="newCardFormVisibility">
            <new-card-form @hideForm="showNewCardForm" @loadNewData="loadNewData"/>
        </div>
    </div>
</template>

<script>

    import newCardForm from "./newCardForm";

    export default {
        name: "newCard",
        data() {
            return {
                newCardFormVisibility: false
            }
        },
        methods: {
            showNewCardForm: function (state) {
                this.newCardFormVisibility = state
            },
            loadNewData: function () {
                this.$emit('loadNewData')
            }

        },
        components: {
            newCardForm
        }
    }
</script>

<style scoped>
    #newCardForm {
        padding: 25px;
        border: 1px solid #b2bec3;
        z-index: 100;
        background-color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 10px;
        box-shadow: 4px 4px 4px #dfe6e9;
    }
</style>