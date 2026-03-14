import api from './service';

export const productService = {
  // Lấy danh sách sản phẩm
  getProducts: async () => {
    const response = await api.get('/products');
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
