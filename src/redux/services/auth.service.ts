import axiosInstance from '@/config/axios';
import { LoginFormData } from '@/types';

const getMe = async () => {
  const response = await axiosInstance.get('https://caroro.invictai.io/api/users/me');
  return response.data;
};

// Login user
const login = async (userData: LoginFormData) => {
  const response = await axiosInstance.post('https://caroro.invictai.io/api/auth/login', userData);
  return response.data;
};

// Logout user
const logout = async () => {
  const response = await axiosInstance.post('https://caroro.invictai.io/api/auth/logout');
  return response.data;
};

const authService = {
  getMe,
  logout,
  login
};

export default authService;