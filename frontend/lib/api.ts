import axios, { AxiosInstance } from 'axios';
import { useAuthStore } from './store';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

let apiClient: AxiosInstance;

export const initializeAPI = () => {
  apiClient = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  });

  // Add token to requests
  apiClient.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Handle errors
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        useAuthStore.getState().logout();
      }
      
      // Better error logging
      console.error('API Error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
        url: error.config?.url,
      });
      
      return Promise.reject(error);
    }
  );

  return apiClient;
};

export const getAPI = () => {
  if (!apiClient) {
    initializeAPI();
  }
  return apiClient;
};

// Auth APIs
export const authAPI = {
  login: (email: string, password: string) =>
    getAPI().post('/auth/login', { email, password }),
  signup: (email: string, name: string, password: string) =>
    getAPI().post('/auth/signup', { email, name, password }),
};

// Project APIs
export const projectAPI = {
  list: (userId: string) =>
    getAPI().get(`/projects/user/${userId}`),
  create: (userId: string, name: string, description?: string) =>
    getAPI().post('/projects', { userId, name, description }),
  get: (projectId: string) =>
    getAPI().get(`/projects/${projectId}`),
  update: (projectId: string, data: any) =>
    getAPI().put(`/projects/${projectId}`, data),
  delete: (projectId: string) =>
    getAPI().delete(`/projects/${projectId}`),
};

// Ingestion APIs
export const ingestionAPI = {
  upload: (projectId: string, sourceType: string, text?: string, file?: File) => {
    const formData = new FormData();
    formData.append('projectId', projectId);
    formData.append('sourceType', sourceType);
    if (text) formData.append('text', text);
    if (file) formData.append('file', file);

    return getAPI().post('/ingestion/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  getSources: (projectId: string) =>
    getAPI().get(`/ingestion/sources/${projectId}`),
  getSource: (sourceId: string) =>
    getAPI().get(`/ingestion/source/${sourceId}`),
  deleteSource: (sourceId: string) =>
    getAPI().delete(`/ingestion/source/${sourceId}`),
};

// Requirement APIs
export const requirementAPI = {
  list: (projectId: string) =>
    getAPI().get(`/requirements/${projectId}`),
  listByType: (projectId: string, type: string) =>
    getAPI().get(`/requirements/${projectId}/type/${type}`),
  update: (requirementId: string, data: any) =>
    getAPI().put(`/requirements/${requirementId}`, data),
  delete: (requirementId: string) =>
    getAPI().delete(`/requirements/${requirementId}`),
};

// BRD APIs
export const brdAPI = {
  generate: (projectId: string) =>
    getAPI().post(`/brds/generate/${projectId}`),
  get: (brdId: string) =>
    getAPI().get(`/brds/${brdId}`),
  listByProject: (projectId: string) =>
    getAPI().get(`/brds/project/${projectId}`),
  editSection: (brdId: string, sectionName: string, editRequest: string) =>
    getAPI().put(`/brds/${brdId}/edit`, { sectionName, editRequest }),
  delete: (brdId: string) =>
    getAPI().delete(`/brds/${brdId}`),
};
