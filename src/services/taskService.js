import axios from 'axios';

const API_URL = 'http://localhost:3000';

export default {
  getTasks() {
    return axios.get(`${API_URL}/tasks`);
  },
  addTask(task) {
    return axios.post(`${API_URL}/tasks`, task);
  },
  updateTask(id, task) {
    return axios.put(`${API_URL}/tasks/${id}`, task);
  },
  deleteTask(id) {
    return axios.delete(`${API_URL}/tasks/${id}`);
  }
};

