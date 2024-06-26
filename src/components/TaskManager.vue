<template>
  <div class="container mt-5">
    <h1 class="mb-4">My To-Do List</h1>
    <!-- Add Task Form -->
    <form @submit.prevent="addTask" class="mb-4">
      <div class="form-row">
        <div class="col-md-4 mb-3">
          <label for="title">Title</label>
          <input v-model="newTask.title" type="text" class="form-control" id="title" placeholder="Enter task title" required>
        </div>
        <div class="col-md-4 mb-3">
          <label for="status">Status</label>
          <select v-model="newTask.status" class="form-control" id="status">
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div class="col-md-4 align-self-end">
          <button type="submit" class="btn btn-primary btn-block">Add Task</button>
        </div>
      </div>
    </form>
    <!-- Task List -->
    <ul class="list-group">
      <li v-for="task in tasks" :key="task.id" class="list-group-item">
        <div class="d-flex justify-content-between align-items-center">
          <div class="flex-grow-1">
            <input v-model="task.title" @blur="updateTask(task)" class="form-control">
          </div>
          <div class="mx-3">
            <select v-model="task.status" @change="updateTask(task)" class="form-control">
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div>
            <button @click="deleteTask(task.id)" class="btn btn-danger">Delete</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import taskService from '../services/taskService';

export default {
  data() {
    return {
      tasks: [],
      newTask: {
        title: '',
        status: 'pending' // Default status
      }
    };
  },
  created() {
    this.fetchTasks(); // Fetch tasks when component is created
  },
  methods: {
    fetchTasks() {
      taskService.getTasks().then(response => {
        this.tasks = response.data;
      }).catch(error => {
        console.error('Error fetching tasks:', error);
      });
    },
    addTask() {
      axios.post('http://localhost:3000/tasks', this.newTask)
        .then(response => {
          console.log('Task added:', response.data);
          this.fetchTasks(); // Refresh tasks after adding
          this.newTask.title = ''; // Clear input fields after successful add
          this.newTask.status = 'pending'; // Reset status after adding task
        })
        .catch(error => {
          console.error('Error adding task:', error);
          // Handle error gracefully (e.g., show error message to user)
        });
    },
    updateTask(task) {
      taskService.updateTask(task.id, task).then(() => {
        this.fetchTasks(); // Refresh tasks after update
      }).catch(error => {
        console.error('Error updating task:', error);
        // Handle error gracefully
      });
    },
    deleteTask(id) {
      taskService.deleteTask(id).then(() => {
        this.fetchTasks(); // Refresh tasks after deletion
      }).catch(error => {
        console.error('Error deleting task:', error);
        // Handle error gracefully
      });
    }
  }
};
</script>
