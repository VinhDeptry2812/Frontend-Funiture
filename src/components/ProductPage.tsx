import React from 'react';
import { ChevronRight, ChevronDown, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { sofaProducts } from '../constants';

interface ProductPageProps {
  onNavigate: (view: 'home' | 'products' | 'detail' | 'cart' | 'login' | 'register' | 'forgot-password' | 'reset-password' | 'admin-login' | 'profile', productId?: number) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-[10px] sm:text-xs text-neutral-400 mb-8 uppercase tracking-widest">
        <button onClick={() => onNavigate('home')} className="hover:text-black transition-colors">Trang chủ</button>
        <ChevronRight className="h-3 w-3" />
        <span className="text-neutral-900 font-medium">Sofa</span>
      </nav>

      {/* Category Header */}
      <div className="mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4 tracking-tighter"
        >
          Sofa
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-neutral-500 text-base sm:text-lg max-w-2xl leading-relaxed"
        >
          Hòa quyện giữa thiết kế hiện đại và sự thoải mái tối đa. Khám phá bộ sưu tập sofa cao cấp được chế tác tỉ mỉ cho không gian sống của bạn.
        </motion.p>
      </div>

      {/* Filter & Sort Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between border-y border-neutral-100 py-4 mb-12 gap-4">
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <button className="flex items-center gap-2 px-4 py-2 bg-neutral-50 hover:bg-neutral-100 transition-colors rounded text-xs sm:text-sm font-medium">
            Mức giá <ChevronDown className="h-4 w-4" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-neutral-50 hover:bg-neutral-100 transition-colors rounded text-xs sm:text-sm font-medium">
            Kích thước <ChevronDown className="h-4 w-4" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-neutral-50 hover:bg-neutral-100 transition-colors rounded text-xs sm:text-sm font-medium">
            Màu sắc <ChevronDown className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs sm:text-sm text-neutral-500">Sắp xếp theo:</span>
          <select className="border-none bg-transparent text-xs sm:text-sm font-bold focus:ring-0 cursor-pointer">
            <option>Bán chạy nhất</option>
            <option>Mới nhất</option>
            <option>Giá: Thấp đến Cao</option>
            <option>Giá: Cao đến Thấp</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 mb-16">
        {sofaProducts.map((product, index) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="group"
          >
            <div className="aspect-square bg-neutral-50 overflow-hidden relative mb-4">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-black text-white text-[10px] px-2 py-1 uppercase font-bold tracking-tighter">
                  Mới
                </span>
              )}
              {product.discount && (
                <span className="absolute top-4 left-4 bg-red-600 text-white text-[10px] px-2 py-1 uppercase font-bold tracking-tighter">
                  {product.discount}
                </span>
              )}
            </div>
            <h3 
              onClick={() => onNavigate('detail', product.id)}
              className="text-sm sm:text-base font-bold text-neutral-900 mb-1 leading-snug group-hover:underline cursor-pointer"
            >
              {product.name}
            </h3>
            <div className="flex items-center gap-2 mb-4">
              <p className="text-neutral-900 font-bold">{product.price}</p>
              {product.oldPrice && (
                <p className="text-neutral-400 line-through text-xs sm:text-sm">{product.oldPrice}</p>
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
