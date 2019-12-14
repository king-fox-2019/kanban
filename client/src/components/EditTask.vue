<template>
  <div class="modal-mask flex items-center justify-center">
    <a href="#" class="modal-exit" @click="closeModal"></a>
    <div
      class="bg-white modal-container bg-white flex items-center justify-center py-5 rounded mb-32"
    >
      <div class="w-10/12">
        <h1 class="font-bold text-center text-3xl mb-4">Edit</h1>
        <form class="flex-col">
          <div class="mb-4">
            <label class="font-bold tracking-tight mb-2" for="title">Title</label>
            <br />
            <input
              v-model="title"
              type="text"
              id="title"
              class="w-full border-gray-500 border py-1 px-2 focus:outline-none"
            />
          </div>
          <div class="mb-4">
            <label class="font-bold tracking-tight mb-2" for="title">Asign to</label>
            <br />
            <input
              v-model="asign"
              type="text"
              id="title"
              class="w-full border-gray-500 border py-1 px-2 focus:outline-none"
            />
          </div>
          <div class="mb-4">
            <label class="font-bold tracking-tight mb-2" for="description">Description</label>
            <br />
            <input
              v-model="description"
              type="text"
              id="description"
              class="w-full border-gray-500 border py-1 px-2 focus:outline-none"
            />
          </div>
          <div class="mb-4">
            <multiselect v-model="status" :options="options"></multiselect>
          </div>
          <div class="flex justify-between">
            <button
              @click.prevent="updateTask"
              class="px-3 py-1 bg-teal-700 text-white rounded focus:outline-none"
            >
              Save
            </button>
            <button
              @click.prevent="removeTask"
              class="px-3 py-1 bg-red-500 text-white rounded focus:outline-none"
            >
              Remove
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import firebase from '../apis/firebase';

const { Task } = firebase;

export default {
  props: ['task'],
  components: {
    Multiselect,
  },
  data() {
    return {
      id: '',
      title: '',
      asign: '',
      status: '',
      description: '',
      options: ['Backlog', 'Todo', 'On Progress', 'Done'],
    };
  },
  methods: {
    updateTask() {
      Task.doc(this.id)
        .set({
          title: this.title,
          asign: this.asign,
          status: this.status,
          description: this.description,
        })
        .then((_) => {
          console.log('Document successfully written!');
          this.closeModal();
          // this.$emit('closeModal')
        })
        .catch(console.log);
    },
    removeTask() {
      Task.doc(this.id)
        .delete()
        .then((_) => {
          console.log('Document deleted');
          this.closeModal();
        })
        .catch(console.log);
    },
    closeModal() {
      this.$emit('closeModal');
    },
  },
  created() {
    this.id = this.task.id;
    this.title = this.task.title;
    this.asign = this.task.asign;
    this.status = this.task.status;
    this.description = this.task.description;
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.modal-mask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.modal-exit {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.modal-container {
  width: 500px;
  height: auto;
  z-index: 2;
}
</style>
