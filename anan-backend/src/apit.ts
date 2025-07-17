// utils/api.ts or services/api.ts
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://zoe-test-api.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;