<template>
    <div>
        <new-card/>
        <hr>
        <p></p>
        <sui-grid :columns="4">
            <sui-grid-column class="grid">
                <sui-card class="card-container">
                    <sui-card-content id="card-open-title">
                        <sui-card-header class="left floated">OPEN</sui-card-header>
                        <sui-card-content class="right floated">{{ open.length}} Cards</sui-card-content>
                    </sui-card-content>
                    <sui-card-content id="card-open-body">
                        <card-container :data="open"/>
                    </sui-card-content>
                </sui-card>
            </sui-grid-column>
            <sui-grid-column class="grid">
                <sui-card class="card-container">
                    <sui-card-content id="card-inprogress-title">
                        <sui-card-header class="left floated">IN PROGRESS</sui-card-header>
                        <sui-card-content class="right floated">{{ inProgress.length}} Cards</sui-card-content>
                    </sui-card-content>
                    <sui-card-content id="card-inprogress-body">
                        <card-container :data="inProgress" />
                    </sui-card-content>
                </sui-card>
            </sui-grid-column>
            <sui-grid-column class="grid">
                <sui-card class="card-container">
                    <sui-card-content id="card-ready-title">
                        <sui-card-header class="left floated">READY</sui-card-header>
                        <sui-card-content class="right floated">{{ ready.length}} Cards</sui-card-content>
                    </sui-card-content>
                    <sui-card-content id="card-ready-body">
                        <card-container :data="ready" />
                    </sui-card-content>
                </sui-card>
            </sui-grid-column>
            <sui-grid-column class="grid">
                <sui-card class="card-container">
                    <sui-card-content id="card-closed-title">
                        <sui-card-header class="left floated">COMPLETED</sui-card-header>
                        <sui-card-content class="right floated">{{ completed.length}} Cards</sui-card-content>
                    </sui-card-content>
                    <sui-card-content id="card-closed-body">
                        <card-container :data="completed" />
                    </sui-card-content>
                </sui-card>
            </sui-grid-column>
        </sui-grid>
    </div>
</template>

<script>
    import cardContainer from "./cardContainer";
    import newCard from "./newCard";

    export default {
        name: "mainContainer",
        data() {
            return {
                open: [],
                inProgress: [],
                ready: [],
                completed: []
            }
        },
        methods: {
            readData: function () {
                const db = firebase.firestore();
                db.collection("kanban-list")
                    .onSnapshot((querySnapshot) => {
                        this.open = [];
                        this.inProgress = [];
                        this.ready = [];
                        this.completed = [];
                        querySnapshot.forEach((doc) => {
                            if (doc.data().status === "Open") this.open.unshift(
                                {id: doc.id, data: doc.data()}
                            );
                            if (doc.data().status === "In Progress") this.inProgress.unshift(
                                {id: doc.id, data: doc.data()}
                            );
                            if (doc.data().status === "Ready") this.ready.unshift(
                                {id: doc.id, data: doc.data()}
                            );
                            if (doc.data().status === "Completed") this.completed.unshift(
                                {id: doc.id, data: doc.data()}
                            );
                        });
                    })
            }
        },
        mounted() {
            this.readData()
        },
        components: {
            cardContainer,
            newCard
        }
    }
</script>

<style scoped>
    .card-container {
        min-width: 300px;
        max-width: 300px;
    }

    #card-open-title {
        background-color: #badc58 !important;
    }

    #card-open-body {
        background-color: #6ab04c !important;
    }

    #card-inprogress-body {
        background-color: #f9ca24 !important;
    }

    #card-inprogress-title {
        background-color: #f6e58d !important;
    }

    #card-ready-body {
        background-color: #eb4d4b !important;
    }

    #card-ready-title {
        background-color: #ff7979 !important;
    }

    #card-closed-body {
        background-color: #535c68 !important;
    }

    #card-closed-title {
        background-color: #95afc0 !important;
    }
</style>