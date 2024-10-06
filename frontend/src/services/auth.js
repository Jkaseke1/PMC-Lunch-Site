// src/services/auth.js
import api from './api';

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export const register = async (email, password) => {
  const response = await api.post('/auth/register', { email, password });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};
