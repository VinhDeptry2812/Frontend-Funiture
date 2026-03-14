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
  }
};
