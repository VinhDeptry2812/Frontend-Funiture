export const formatPrice = (price: number | string) => {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(num);
};

export const getImageUrl = (path: string) => {
  if (!path) return 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800';
  if (path.startsWith('http')) return path;
  // Giả sử backend serve media qua /storage/
  return `http://127.0.0.1:8000/storage/${path}`;
};
