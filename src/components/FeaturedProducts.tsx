import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { productService } from '../Service/productService';
import { formatPrice, getImageUrl } from '../utils';

interface FeaturedProductsProps {
  onNavigate: (view: 'home' | 'products' | 'detail' | 'cart' | 'login' | 'register' | 'forgot-password' | 'reset-password' | 'admin-login' | 'profile', productId?: number) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onNavigate }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await productService.getProducts();
        // API backend trả về CursorPagination, dữ liệu nằm trong response.data
        // Ở đây ta lọc ra các sản phẩm is_featured hoặc lấy n sản phẩm đầu tiên
        setProducts(response.data || []);
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  if (isLoading) {
    return (
      <section className="bg-neutral-50 py-24">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-64 bg-neutral-200 mb-4" />
            <div className="h-4 w-48 bg-neutral-100" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-neutral-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight">Sản phẩm nổi bật</h2>
          <p className="mt-4 text-neutral-500 max-w-xl mx-auto">
            Những thiết kế tinh xảo nhất được lựa chọn kỹ lưỡng cho không gian sống của bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white p-4 transition-all hover:shadow-xl"
            >
              <div className="relative aspect-square overflow-hidden bg-neutral-100 mb-6 cursor-pointer" onClick={() => onNavigate('detail', product.id)}>
                <img 
                  src={getImageUrl(product.image_url)} 
                  alt={product.name} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                {product.is_featured && (
                  <span className="absolute top-4 left-4 bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                    FEATURED
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold mb-1 truncate cursor-pointer" onClick={() => onNavigate('detail', product.id)}>{product.name}</h3>
              <p className="text-neutral-900 font-bold mb-6">{formatPrice(product.sale_price || product.base_price)}</p>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => onNavigate('detail', product.id)}
                  className="border border-black py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                >
                  Xem chi tiết
                </button>
                <button className="bg-black text-white py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all">
                  Thêm giỏ
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
