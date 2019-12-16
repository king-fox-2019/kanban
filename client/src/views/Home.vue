<template>
  <div class="home w-full flex justify-between bg-img h-screen">
    <div class="z-10 w-full flex-col">
      <NavBar></NavBar>
      <div class="flex h-auto w-3/4 justify-between flex-wrap mx-auto">
        <TaskContainer :head="'Backlog'"></TaskContainer>
        <TaskContainer :head="'Todo'"></TaskContainer>
        <TaskContainer :head="'On Progress'"></TaskContainer>
        <TaskContainer :head="'Done'"></TaskContainer>
      </div>
    </div>
  </div>
</template>

<script>
import TaskContainer from '@/components/TaskContainer';
import NavBar from '@/components/NavBar';

export default {
  name: 'home',
  components: {
    TaskContainer,
    NavBar,
  },
};
</script>
<style scoped>
.bg-img {
  background-image: url('https://i.pinimg.com/originals/2c/ae/0b/2cae0bc2aa1fb7ea5d83f3fcd71df28c.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
