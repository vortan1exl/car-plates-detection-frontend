import axios from 'axios';
import { ParkingInfo, PersonnelArray, VehicleStatus, VehicleDTO } from "../types/types";
import { VehicleHistory } from "../types/types";
import { ParkStatus } from "../types/types";
import { ProfileStudent } from "../types/types";
import { ProfilePersonnel } from "../types/types";
import { StudentArray } from "../types/types";



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

export const getVisitCount = async (): Promise<number> => {
  const response = await api.get('/student/visit_count');
  return response.data;
};


export const getVehicleStatus = async (): Promise<VehicleStatus[]> => {
  const response = await api.get("/student/vehicle_status");
  return response.data;
};

export const getStudentVehicleHistory = async (): Promise<VehicleHistory[]> => {
  const response = await api.get('/student/vehicle_history');
  return response.data;
};

export const getParkingStatus = async (): Promise<ParkStatus> => {
  const response = await api.get('/student/status_parking');
  return response.data;
};

export const getProfileStudent = async (): Promise<ProfileStudent> => {
  const response = await api.get('/student/profile');
  return response.data;
};

export const getAverageTime = async (): Promise<number> => {
  const response = await api.get('/student/average_visit_time');
  return response.data;
};

export const getProfilePersonnel = async (): Promise<ProfilePersonnel> => {
  const response = await api.get('/personnel/profile');
  return response.data;
};

export const getAllStudent = async (): Promise<StudentArray[]> => {
  const response = await api.get('/admin/all_student');
  return response.data;
};

export const getAllPersonnel = async (): Promise<PersonnelArray[]> => {
  const response = await api.get('/admin/all_personnel');
  return response.data;
};

export const getParkingNow = async (): Promise<ParkingInfo[]> => {
  const response = await api.get('/admin/get_vehicle_parking');
  return response.data;
};

export const getParkingHistory = async (): Promise<ParkingInfo[]> => {
  const response = await api.get('/admin/get_vehicle_history');
  return response.data;
};

export const getStudentById = async (uuid: string): Promise<ProfileStudent> => {
  const response = await api.get(`/admin/student/${uuid}`);
  return response.data;
};

export const getPersonnelById = async (uuid: string): Promise<ProfilePersonnel> => {
  const response = await api.get(`/admin/personnel/${uuid}`);
  console.log(response.data);
  return response.data;
};

export const updateStudentById = async (uuid: string, StudentArray: StudentArray): Promise<StudentArray> => {
  const response = await api.post(`/admin/update_student/${uuid}`, StudentArray);
  return response.data;
};

export const updatePersonnelById = async (uuid: string, PersonnelArray: PersonnelArray): Promise<PersonnelArray> => {
  const response = await api.post(`/admin/update_personnel/${uuid}`, PersonnelArray);
  return response.data;
};

export const addVehicleToStudent = async (uuid: string, VehicleDTO: VehicleDTO): Promise<VehicleDTO> => {
  const response = await api.post(`/admin/add_vehicle_for_student/${uuid}`, VehicleDTO);
  return response.data;
};

export const addVehicleToPersonnel = async (uuid: string, VehicleDTO: VehicleDTO): Promise<VehicleDTO> => {
  const response = await api.post(`/admin/add_vehicle_for_personnel/${uuid}`, VehicleDTO);
  return response.data;
};

export const updateVehicle = async (uuid: string, VehicleDTO: VehicleDTO): Promise<VehicleDTO> => {
  const response = await api.post(`/admin/update_vehicle/${uuid}`, VehicleDTO);
  return response.data;
};

export const deleteVehicle = async (uuid: string): Promise<VehicleDTO> => {
  const response = await api.delete(`/admin/delete_vehicle/${uuid}`);
  return response.data;
};


export default api;