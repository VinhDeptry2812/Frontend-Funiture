import React from 'react';
import { motion } from 'motion/react';
import { products } from '../constants';

interface FeaturedProductsProps {
  onNavigate: (view: 'home' | 'products' | 'detail' | 'cart' | 'login' | 'register' | 'forgot-password' | 'reset-password' | 'admin-login' | 'profile', productId?: number) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onNavigate }) => {
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
          {products.map((product, idx) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white p-4 transition-all hover:shadow-xl"
            >
              <div className="relative aspect-square overflow-hidden bg-neutral-100 mb-6">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                {product.isNew && (
                  <span className="absolute top-4 left-4 bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                    NEW
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold mb-1">{product.name}</h3>
              <p className="text-neutral-900 font-bold mb-6">{product.price}</p>
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
