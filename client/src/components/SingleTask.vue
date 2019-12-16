<template>
  <div class="w-full h-auto bg-white rounded-sm pl-2 mb-2 hover:bg-gray-100">
    <button @click="editCard" class="focus:outline-none w-full">
      <p class="text-sm pl-2 py-2 text-left">{{ task.title }}
        <br>
        <i class="far fa-user"></i> {{ task.asign }}
      </p>
    </button>
    <EditTask v-if="editStatus" :task="task" @closeModal="closeModal"></EditTask>
  </div>
</template>

<script>
import EditTask from './EditTask';
import firebase from '../apis/firebase';

const { Task } = firebase;

export default {
  props: ['task'],
  components: {
    EditTask,
  },
  data() {
    return {
      editStatus: false,
    };
  },
  methods: {
    editCard() {
      this.editStatus = true;
    },
    closeModal() {
      this.editStatus = false;
    },
  },
};
</script>

<style scoped></style>
