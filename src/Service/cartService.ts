import api from './service';

export const cartService = {
  // Lấy danh sách sản phẩm trong giỏ hàng
  getCart: async () => {
    const response = await api.get('/cart');
    return response.data;
  },

  // Thêm vào giỏ hàng
  addToCart: async (productId: number, quantity: number = 1) => {
    const response = await api.post('/cart/add', { product_id: productId, quantity });
    return response.data;
  },

  // Cập nhật số lượng
  updateCartItem: async (itemId: number, quantity: number) => {
    const response = await api.put(`/cart/update/${itemId}`, { quantity });
    return response.data;
  },

  // Xóa khỏi giỏ hàng
  removeFromCart: async (itemId: number) => {
    const response = await api.delete(`/cart/remove/${itemId}`);
    return response.data;
  },

  // Xóa toàn bộ giỏ hàng
  clearCart: async () => {
    const response = await api.delete('/cart/clear');
    return response.data;
  }
};
