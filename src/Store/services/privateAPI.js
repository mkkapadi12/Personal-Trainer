import axios from 'axios';

const API = 'http://localhost:3000/api';

const privateAPI = axios.create({
  baseURL: API,
});

privateAPI.interceptors.request.use((config) => {
  // Check for admin token first, then user token
  const adminToken = localStorage.getItem('workDoAdminToken');
  const userToken = localStorage.getItem('workDo');
  const token = adminToken || userToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default privateAPI;
