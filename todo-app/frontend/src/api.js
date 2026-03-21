import axios from 'axios';

const BASE =
  import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api`
    : '/api';

const api = axios.create({ baseURL: BASE });

export const getTodos = () => api.get('/todos');
export const createTodo = (data) => api.post('/todos', data);
export const updateTodo = (id, data) => api.put(`/todos/${id}`, data);
export const deleteTodo = (id) => api.delete(`/todos/${id}`);
export const clearCompleted = () => api.delete('/todos');

export const addSubTodo = (todoId, data) => api.post(`/todos/${todoId}/subtodos`, data);
export const updateSubTodo = (todoId, subId, data) => api.put(`/todos/${todoId}/subtodos/${subId}`, data);
export const deleteSubTodo = (todoId, subId) => api.delete(`/todos/${todoId}/subtodos/${subId}`);
