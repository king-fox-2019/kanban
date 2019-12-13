<template>
    <sui-form @submit.prevent="addNewData">
        <sui-form-field>
            <label>Title</label>
            <input placeholder="Title" v-model="title" required>
        </sui-form-field>
        <sui-form-field>
            <label>Description</label>
            <textarea
                    rows="5"
                    cols="60"
                    placeholder="Enter description here ..."
                    v-model="content"
                    required
            />
        </sui-form-field>
        <sui-button primary type="submit">Submit</sui-button>
        <sui-button type="button" color="red" @click="hideForm">Cancel</sui-button>
    </sui-form>
</template>

<script>
    const db = firebase.firestore();
    export default {
        name: "newCardForm",
        data() {
            return {
                title: null,
                content: null
            }
        },
        methods: {
            addNewData: function () {
                db.collection("kanban-list")
                    .add({
                        title: this.title,
                        content: this.content,
                        action: "In Progress",
                        date: new Date(),
                        imgProfile: "https://semantic-ui-vue.github.io/static/images/avatar/large/steve.jpg",
                        status: "Open"
                    })
                    .then(() => {
                        console.log("Document successfully written!");
                        this.$emit('loadNewData')
                        this.hideForm()
                    })
                    .catch(function (error) {
                        console.error("Error writing document: ", error);
                    });
            },
            hideForm: function () {
                this.$emit('hideForm', false)
            }
        }
    }
</script>

<style scoped>

</style>