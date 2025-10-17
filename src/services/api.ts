import axios from 'axios';

// Determine the API base URL based on environment
const getApiBaseUrl = () => {
  // If REACT_APP_API_URL is set, use it (for custom deployments)
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // Check if we're in development or production
  const isDevelopment = process.env.NODE_ENV === 'development' || 
                       window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1';
  
  if (isDevelopment) {
    // Local development - check if server is running on 5001 (due to port conflict fix)
    return 'http://localhost:5001/api';
  } else {
    // Production environment
    return 'https://shrm-server-production.up.railway.app/api';
  }
};

// Get the API URL and log it for debugging
const apiBaseUrl = getApiBaseUrl();
console.log('🔗 API Base URL:', apiBaseUrl);
console.log('🌍 Environment:', process.env.NODE_ENV);
console.log('🏠 Hostname:', window.location.hostname);

// Create axios instance with base configuration
const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 15000, // Increased timeout for production
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    } else if (error.code === 'NETWORK_ERROR' || !error.response) {
      // Handle network errors
      console.error('Network error - check if server is running:', error.message);
    } else if (error.response?.status >= 500) {
      // Handle server errors
      console.error('Server error:', error.response.status, error.response.data);
    }
    
    return Promise.reject(error);
  }
);

// API service functions
export const apiService = {
  // Authentication
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
  }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Appointments
  createAppointment: async (appointmentData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    serviceType: string;
    preferredDate: string;
    preferredTime: string;
    sessionType: string;
    hasInsurance: boolean;
    insuranceProvider?: string;
    policyNumber?: string;
    isEmergency: boolean;
    emergencyContactName?: string;
    emergencyContactPhone?: string;
    reasonForCounseling: string;
    previousCounseling: boolean;
    medications: string;
    additionalInfo?: string;
  }) => {
    const response = await api.post('/appointments', appointmentData);
    return response.data;
  },

  getAppointments: async () => {
    const response = await api.get('/appointments');
    return response.data;
  },

  getAppointment: async (id: string) => {
    const response = await api.get(`/appointments/${id}`);
    return response.data;
  },

  updateAppointment: async (id: string, updateData: any) => {
    const response = await api.put(`/appointments/${id}`, updateData);
    return response.data;
  },

  cancelAppointment: async (id: string, reason?: string) => {
    const response = await api.patch(`/appointments/${id}/cancel`, { reason });
    return response.data;
  },

  // Contact
  sendContactMessage: async (contactData: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }) => {
    const response = await api.post('/contact', contactData);
    return response.data;
  },

  // Services
  getServices: async () => {
    const response = await api.get('/services');
    return response.data;
  },

  // User profile
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  updateProfile: async (profileData: any) => {
    const response = await api.put('/users/profile', profileData);
    return response.data;
  },
};

export default api;