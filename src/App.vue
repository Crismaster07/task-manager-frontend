<template>
  <div id="app">
    <AppNavbar />
    <!-- Main Content - Task Manager -->
    <div class="container mt-4">
      <TaskManager />
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppNavbar from './components/Navbar.vue'; 
import TaskManager from './components/TaskManager.vue';
import AppFooter from './components/Footer.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import './global.css'; 

export default {
  name: 'App',
  components: {
    AppNavbar, 
    TaskManager,
    AppFooter
  }
};
</script>

