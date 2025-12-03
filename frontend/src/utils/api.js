import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const apiClient = axios.create({
  baseURL: API,
  withCredentials: true
});

export const api = {
  // Exercises
  getExercises: (category, difficulty) => {
    const params = {};
    if (category) params.category = category;
    if (difficulty) params.difficulty = difficulty;
    return apiClient.get('/exercises', { params });
  },
  getExercise: (id) => apiClient.get(`/exercises/${id}`),
  createExercise: (data) => apiClient.post('/exercises', data),
  updateExercise: (id, data) => apiClient.put(`/exercises/${id}`, data),
  deleteExercise: (id) => apiClient.delete(`/exercises/${id}`),

  // Therapy Plans
  getTherapyPlans: () => apiClient.get('/therapy-plans'),
  getTherapyPlan: (id) => apiClient.get(`/therapy-plans/${id}`),
  createTherapyPlan: (data) => apiClient.post('/therapy-plans', data),
  addExerciseToPlan: (planId, data) => apiClient.post(`/therapy-plans/${planId}/exercises`, data),

  // Progress
  getProgress: () => apiClient.get('/progress'),
  createProgress: (data) => apiClient.post('/progress', data),
  addTherapistComment: (entryId, comment) => {
    const formData = new FormData();
    formData.append('comment', comment);
    return apiClient.put(`/progress/${entryId}/comment`, formData);
  },

  // Appointments
  getAppointments: () => apiClient.get('/appointments'),
  createAppointment: (data) => apiClient.post('/appointments', data),
  updateAppointment: (id, data) => apiClient.put(`/appointments/${id}`, data),

  // Patients
  getPatients: () => apiClient.get('/patients'),
  getPatient: (id) => apiClient.get(`/patients/${id}`),
  createPatient: (data) => apiClient.post('/patients', data),
  updatePatient: (id, data) => apiClient.put(`/patients/${id}`, data),

  // AI Recommendations
  getAIRecommendations: (patientId) => {
    const formData = new FormData();
    formData.append('patient_id', patientId);
    return apiClient.post('/ai/recommend-exercises', formData);
  },

  // Admin
  getAllUsers: () => apiClient.get('/admin/users'),
  updateUserRole: (userId, role) => {
    const formData = new FormData();
    formData.append('role', role);
    return apiClient.put(`/admin/users/${userId}/role`, formData);
  },
  getStats: () => apiClient.get('/admin/stats')
};

export default apiClient;