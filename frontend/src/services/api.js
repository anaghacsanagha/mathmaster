import axios from 'axios';

// JSON Server exposes REST resources directly (no /api prefix or Express middleware).
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000' });
export default api;
