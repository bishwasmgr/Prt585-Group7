// src/api/axios.js
import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:5274/api',  // Your API's base URL
});
