import api from './service';

export const productService = {
  // Lấy danh sách sản phẩm với các bộ lọc và phân trang
  getProducts: async (params?: { 
    cursor?: string; 
    category_id?: number; 
    min_price?: number; 
    max_price?: number; 
    sort_by?: string; 
    sort_order?: string;
    search?: string;
    all?: boolean; // 👈 Thêm option lấy cả SF ẩn dành cho Admin
  }) => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  // Lấy chi tiết sản phẩm
  getProductById: async (id: number | string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Lấy danh sách danh mục
  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },

  // Lấy biến thể sản phẩm
  getProductVariants: async (id: number | string) => {
    const response = await api.get(`/products/${id}/variants`);
    return response.data;
  },

  // Tạo sản phẩm mới (Hỗ trợ upload ảnh)
  createProduct: async (formData: FormData) => {
    const response = await api.post('/products/create', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  // Thêm biến thể mới cho sản phẩm (Hỗ trợ upload ảnh)
  createVariant: async (productId: number | string, data: FormData) => {
    const response = await api.post(`/products/${productId}/variants`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  updateProduct: async (id: number | string, data: FormData) => {
    data.append('_method', 'PUT'); // Laravel hỗ trợ POST _method=PUT cho multipart
    const response = await api.post(`/products/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  updateVariant: async (productId: number | string, variantId: number | string, data: FormData) => {
    data.append('_method', 'PUT');
    const response = await api.post(`/products/${productId}/variants/${variantId}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  deleteVariant: async (productId: number | string, variantId: number | string) => {
    const response = await api.delete(`/products/${productId}/variants/${variantId}`);
    return response.data;
  },
};
