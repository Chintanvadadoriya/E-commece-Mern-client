// src/api.js
import axios from 'axios';
import { BASE_URL } from './constant';

const api = axios.create({
  baseURL: BASE_URL,
});
export default api;
