import api from './service';

export const authService = {
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
  }
};
