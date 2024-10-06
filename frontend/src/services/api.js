import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests to add the auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getProfile = async () => {
  try {
    const response = await api.get('/users/profile');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateProfile = async (userData) => {
  try {
    const response = await api.put('/users/profile', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getOrders = async () => {
  try {
    const response = await api.get('/orders');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllOrders = async () => {
  try {
    const response = await api.get('/orders/all');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/orders', orderData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const response = await api.put(`/orders/${orderId}/status`, { status: newStatus });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getOrdersByDate = async (date) => {
  try {
    const response = await api.get(`/orders/date?date=${date}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const generateReport = async (startDate, endDate) => {
  try {
    const response = await api.get(`/orders/report?startDate=${startDate}&endDate=${endDate}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getMenuItems = async () => {
  try {
    const response = await api.get('/menu');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const addMenuItem = async (menuItemData) => {
  try {
    const response = await api.post('/menu', menuItemData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateMenuItem = async (id, menuItemData) => {
  try {
    const response = await api.put(`/menu/${id}`, menuItemData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteMenuItem = async (id) => {
  try {
    const response = await api.delete(`/menu/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const checkAdminStatus = async () => {
  try {
    const response = await api.get('/auth/admin-status');
    return response.data;
  } catch (error) {
    console.error('Error checking admin status:', error);
    throw error;
  }
};

export default api;
