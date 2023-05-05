import axiosInstance from '@/config/axios';
import { LoginFormData } from '@/types';

const getMe = async () => {
  const response = await axiosInstance.get('/users/me');
  return response.data;
};

// Login user
const login = async (userData: LoginFormData) => {
  const response = await axiosInstance.post('/auth/login', userData);
  return response.data;
};

// Logout user
const logout = async () => {
  const response = await axiosInstance.post('/auth/logout');
  return response.data;
};

const authService = {
  getMe,
  logout,
  login
};

export default authService;