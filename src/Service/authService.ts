
import api from './service';

export const authService = {
  //Đăng nhập admin
  LoginAdmin: async (data:any)=>{
    const response = await api.post('/admin/login',data);
    return response.data;
  },

  //Lấy thông tin admin
  getAdminProfile: async () => {
    const response = await api.get('/admin/me');
    return response.data;
  },

  // Đăng nhập
  login: async (data: any) => {
    const response = await api.post('/login', data);
    return response.data;
  },

  // Đăng ký
  register: async (data: any) => {
    const response = await api.post('/register', data);
    return response.data;
  },

  // Lấy thông tin cá nhân
  getProfile: async () => {
    const response = await api.get('/me');
    return response.data;
  },

  // Đăng xuất
  logout: async () => {
    const response = await api.post('/logout');
    return response.data;
  },

  // Quên mật khẩu
  forgotPassword: async (email: string) => {
    const response = await api.post('/forgot-password', { email });
    return response.data;
  },

  // Đặt lại mật khẩu
  resetPassword: async (data: any) => {
    const response = await api.post('/reset-password', data);
    return response.data;
  },

  // Cập nhật profile
  updateProfile: async (data: any) => {
    const response = await api.put('/update-profile', data);
    return response.data;
  },

  // --- Quản lý địa chỉ ---
  getAddresses: async () => {
    const response = await api.get('/user/addresses');
    return response.data;
  },

  addAddress: async (data: any) => {
    const response = await api.post('/user/addresses', data);
    return response.data;
  },

  updateAddress: async (id: number, data: any) => {
    const response = await api.put(`/user/addresses/${id}`, data);
    return response.data;
  },

  deleteAddress: async (id: number) => {
    const response = await api.delete(`/user/addresses/${id}`);
    return response.data;
  },

  setDefaultAddress: async (id: number) => {
    const response = await api.patch(`/user/addresses/${id}/set-default`);
    return response.data;
  },

  // Phương thức Social Login
  getSocialLoginUrl: (provider: 'google' | 'facebook') => {
    // @ts-ignore
    const baseUrl = import.meta.env?.VITE_API_URL || 'http://127.0.0.1:8000/api';
    return `${baseUrl}/auth/${provider}`;
  }
};
