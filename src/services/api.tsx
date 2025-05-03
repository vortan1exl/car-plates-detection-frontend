import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081/api',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await api.post('/auth/refresh');
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/student-auth';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const requestStudentCode = async (email: string) => {
  const response = await api.post('/auth/student', { email });
  return response.data;
};

export const studentLogin = async (email: string, code: string) => {
  const response = await api.post('/auth/student/login', { email, code });
  localStorage.setItem('accessToken', response.data.accessToken);
  localStorage.setItem('refreshToken', response.data.refreshToken);
  return response.data;
};

export const adminLogin = async (email: string, password: string) => {
  const response = await api.post('/auth/admin/login', { email, password });
  localStorage.setItem('accessToken', response.data.accessToken);
  localStorage.setItem('refreshToken', response.data.refreshToken);
  return response.data;
};

export const signOut = async () => {
  await api.post('/auth/sign-out');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export default api;