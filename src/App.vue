<template>
  <div id="app">
    <TaskManager />
  </div>
</template>

<script>
import TaskManager from './components/TaskManager.vue';
import 'bootstrap/dist/css/bootstrap.min.css';


export default {
  name: 'App',
  components: {
    TaskManager
  }
};
</script>


