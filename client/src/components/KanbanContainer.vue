/* eslint-disable */
<template>
  <div id="backlog" class>
    <v-card max-width class="mx-auto">
      <v-app-bar dark :color="headColor">
        <v-toolbar-title>{{title}}</v-toolbar-title>

        <v-spacer></v-spacer>
      </v-app-bar>
      <v-container>
        <v-row dense>

          <v-col v-for="(task, i) in tasks" :key="i" cols="12">
            <!-- <v-card :color="bodyColor" dark>
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="headline" v-text="task.title"></v-card-title>

                  <v-card-subtitle v-text="`Task point: ${task.point ? task.point: ''}`"></v-card-subtitle>

                  <v-card-text v-text="task.description"></v-card-text>

                  <v-card-subtitle v-text="`Assigned to: ${task.assignTo}`"></v-card-subtitle>

                  <div class="row ml-2">
                    <v-card-actions
                      @click="deleteTask(task.id)">
                      <v-btn text>Delete</v-btn>
                    </v-card-actions>

                    <v-card-actions>
                      <v-menu class offset-y>
                        <template v-slot:activator="{ on }">
                          <v-btn text v-on="on">Move to</v-btn>
                        </template>
                        <v-list>
                          <v-list-item
                            v-for="(item, index) in dropdownCategories"
                            :key="index"
                            @click="moveTask"
                          >
                            <v-list-item-title :id="`${item},${task.id}`">{{ item }}</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-card-actions>
                  </div>
                </div>
              </div>
            </v-card> -->
            <KanbanCard
              :body-color="bodyColor"
              :dropdown-categories="dropdownCategories"
              :task="task"
              @delete-task="deleteTask"
              @move-task="moveTask"
              />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import KanbanCard from './KanbanCard'

export default {
  name: "kanban-container",

  props: ["title", "tasks", "dropdownCategories", "headColor", "bodyColor"],

  components: {
    KanbanCard
  },

  methods: {
    deleteTask: function (taskId) {
      this.$emit("delete-task", taskId);
    },

    moveTask: function (payload) {
      this.$emit("move-task", payload);
    }
  }
};
</script>

<style>
</style>
