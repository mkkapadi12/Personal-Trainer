import axios from 'axios';

const privateAPI = axios.create({
  baseURL: 'http://localhost:3000/api',
});

privateAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('workDo');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default privateAPI;
