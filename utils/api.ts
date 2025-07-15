import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Use your IP address on physical device
  headers: {
    'Content-Type': 'application/json',
  },
});
