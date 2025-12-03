import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const authService = {
  async processSession(sessionId) {
    const response = await axios.get(`${API}/auth/session?session_id=${sessionId}`, {
      withCredentials: true
    });
    return response.data;
  },

  async getMe() {
    const response = await axios.get(`${API}/auth/me`, {
      withCredentials: true
    });
    return response.data;
  },

  async login(email, password) {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    
    const response = await axios.post(`${API}/auth/login`, formData, {
      withCredentials: true
    });
    return response.data;
  },

  async register(email, password, name) {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('name', name);
    
    const response = await axios.post(`${API}/auth/register`, formData);
    return response.data;
  },

  async logout() {
    const response = await axios.post(`${API}/auth/logout`, {}, {
      withCredentials: true
    });
    return response.data;
  }
};