import React from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { categories } from '../constants';

interface CategoriesProps {
  onNavigate: (view: 'home' | 'products' | 'detail' | 'cart' | 'login' | 'register' | 'forgot-password' | 'reset-password' | 'admin-login' | 'profile', productId?: number) => void;
}

export const Categories: React.FC<CategoriesProps> = ({ onNavigate }) => {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Danh mục nổi bật</h2>
            <div className="mt-2 h-1 w-20 bg-black" />
          </div>
          <button 
            onClick={() => onNavigate('products')}
            className="flex items-center gap-1 text-sm font-bold uppercase tracking-wider hover:opacity-70 transition-opacity"
          >
            Xem tất cả <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat, idx) => (
            <motion.button 
              key={cat.name}
              onClick={() => {
                if (cat.name === 'Sofa') onNavigate('products');
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative aspect-square overflow-hidden bg-neutral-100"
            >
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="text-xl font-bold text-white">{cat.name}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};
