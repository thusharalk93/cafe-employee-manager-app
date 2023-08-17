import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL; // Set your API base URL in the environment variable

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
