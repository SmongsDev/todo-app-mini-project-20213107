import axios from 'axios';

const BASE =
  import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api`
    : '/api';

const api = axios.create({ baseURL: BASE });

export const getTodos = () => api.get('/todos');
export const createTodo = (title) => api.post('/todos', { title });
export const updateTodo = (id, data) => api.put(`/todos/${id}`, data);
export const deleteTodo = (id) => api.delete(`/todos/${id}`);
export const clearCompleted = () => api.delete('/todos');
