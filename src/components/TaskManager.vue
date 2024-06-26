<template>
  <div>
    <h1>Task Manager</h1>
    <form @submit.prevent="addTask">
      <input v-model="newTask.title" placeholder="Title" required />
      <input v-model="newTask.description" placeholder="Description" />
      <button type="submit">Add Task</button>
    </form>

    <ul>
      <li v-for="task in tasks" :key="task.id">
        <div>
          <input v-model="task.title" @blur="updateTask(task)" />
          <input v-model="task.description" @blur="updateTask(task)" />
          <button @click="deleteTask(task.id)">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import taskService from '../services/taskService';

export default {
  data() {
    return {
      tasks: [],
      newTask: {
        title: '',
        description: ''
      }
    };
  },
  created() {
    this.fetchTasks();
  },
  methods: {
    fetchTasks() {
      taskService.getTasks().then(response => {
        this.tasks = response.data;
      });
    },
    addTask() {
      taskService.addTask(this.newTask).then(() => {
        this.fetchTasks();
        this.newTask.title = '';
        this.newTask.description = '';
      });
    },
    updateTask(task) {
      taskService.updateTask(task.id, task).then(() => {
        this.fetchTasks();
      });
    },
    deleteTask(id) {
      taskService.deleteTask(id).then(() => {
        this.fetchTasks();
      });
    }
  }
};
</script>

<style scoped>
/* Add some styles */
</style>
