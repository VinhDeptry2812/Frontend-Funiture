import React, { useEffect, useState } from 'react';
import { ChevronRight, ChevronDown, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { productService } from '../Service/productService';
import { formatPrice, getImageUrl } from '../utils';

interface ProductPageProps {
  onNavigate: (view: 'home' | 'products' | 'detail' | 'cart' | 'login' | 'register' | 'forgot-password' | 'reset-password' | 'admin-login' | 'profile', productId?: number) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ onNavigate }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          productService.getProducts(),
          productService.getCategories()
        ]);
        setProducts(prodRes.data || []);
        setCategories(catRes || []);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
        <p className="mt-4 text-neutral-500 font-medium">Đang tải sản phẩm...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-[10px] sm:text-xs text-neutral-400 mb-8 uppercase tracking-widest">
        <button onClick={() => onNavigate('home')} className="hover:text-black transition-colors">Trang chủ</button>
        <ChevronRight className="h-3 w-3" />
        <span className="text-neutral-900 font-medium">Tất cả sản phẩm</span>
      </nav>

      {/* Category Header */}
      <div className="mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4 tracking-tighter"
        >
          Bộ Sưu Tập
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-neutral-500 text-base sm:text-lg max-w-2xl leading-relaxed"
        >
          Hòa quyện giữa thiết kế hiện đại và sự thoải mái tối đa. Khám phá bộ sưu tập nội thất cao cấp được chế tác tỉ mỉ cho không gian sống của bạn.
        </motion.p>
      </div>

      {/* Filter & Sort Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between border-y border-neutral-100 py-4 mb-12 gap-4">
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <button className="flex items-center gap-2 px-4 py-2 bg-neutral-50 hover:bg-neutral-100 transition-colors rounded text-xs sm:text-sm font-medium">
            Danh mục <ChevronDown className="h-4 w-4" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-neutral-50 hover:bg-neutral-100 transition-colors rounded text-xs sm:text-sm font-medium">
            Mức giá <ChevronDown className="h-4 w-4" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-neutral-50 hover:bg-neutral-100 transition-colors rounded text-xs sm:text-sm font-medium">
            Chất liệu <ChevronDown className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs sm:text-sm text-neutral-500">Sắp xếp theo:</span>
          <select className="border-none bg-transparent text-xs sm:text-sm font-bold focus:ring-0 cursor-pointer">
            <option>Mới nhất</option>
            <option>Giá: Thấp đến Cao</option>
            <option>Giá: Cao đến Thấp</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 mb-16">
        {products.map((product, index) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="group"
          >
            <div className="aspect-square bg-neutral-50 overflow-hidden relative mb-4 cursor-pointer" onClick={() => onNavigate('detail', product.id)}>
              <img 
                src={getImageUrl(product.image_url)} 
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              {product.is_featured && (
                <span className="absolute top-4 left-4 bg-black text-white text-[10px] px-2 py-1 uppercase font-bold tracking-tighter">
                  Nổi bật
                </span>
              )}
              {product.sale_price && product.base_price > product.sale_price && (
                <span className="absolute top-4 left-4 bg-red-600 text-white text-[10px] px-2 py-1 uppercase font-bold tracking-tighter">
                  Giảm giá
                </span>
              )}
            </div>
            <h3 
              onClick={() => onNavigate('detail', product.id)}
              className="text-sm sm:text-base font-bold text-neutral-900 mb-1 leading-snug group-hover:underline cursor-pointer truncate"
            >
              {product.name}
            </h3>
            <div className="flex items-center gap-2 mb-4">
              <p className="text-neutral-900 font-bold">{formatPrice(product.sale_price || product.base_price)}</p>
              {product.sale_price && product.base_price > product.sale_price && (
                <p className="text-neutral-400 line-through text-xs sm:text-sm">{formatPrice(product.base_price)}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => onNavigate('detail', product.id)}
                className="border border-black py-2 text-[10px] font-bold uppercase hover:bg-black hover:text-white transition-colors"
              >
                Xem chi tiết
              </button>
              <button className="bg-black text-white py-2 text-[10px] font-bold uppercase hover:bg-neutral-800 transition-colors">
                Thêm giỏ
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 py-8">
        <button className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-black text-white font-bold text-sm">1</button>
        <button className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-neutral-100 hover:border-black transition-colors text-sm font-medium">2</button>
        <button className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-neutral-100 hover:border-black transition-colors text-sm font-medium">3</button>
        <span className="text-neutral-400">...</span>
        <button className="flex items-center gap-2 px-4 sm:px-6 py-2 border border-neutral-100 hover:border-black transition-colors text-xs sm:text-sm font-bold uppercase tracking-widest">
          Tiếp tục <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
