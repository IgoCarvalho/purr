import axios from 'axios';

const baseUrl =
  import.meta.env.VITE_BASE_API_URL || 'http://localhost:3333/api/v1';

const instance = axios.create({
  baseURL: baseUrl,
});

export default instance;
