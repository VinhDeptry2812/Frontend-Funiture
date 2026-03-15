import axios from "axios";

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})

api.interceptors.request.use((config) => {
    // Kiểm tra nếu API gọi đến endpoint /admin thì ưu tiên lấy admin_token
    const isAdminApi = config.url && (config.url.includes('/admin/') || config.url.includes('/products'));
    const token = isAdminApi 
        ? (localStorage.getItem('admin_token') || localStorage.getItem('token')) // Fallback nếu chưa đổi hết
        : localStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
