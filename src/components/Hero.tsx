import React from 'react';
import { motion } from 'motion/react';

import { useNavigate } from 'react-router-dom';

export const Hero: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=2000" 
        alt="Hero Interior" 
        className="absolute inset-0 h-full w-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-white"
        >
          <h1 className="text-5xl font-bold leading-tight sm:text-7xl">
            Nội thất tối giản cho không gian hiện đại
          </h1>
          <p className="mt-6 text-lg text-neutral-200 sm:text-xl max-w-lg">
            Khám phá bộ sưu tập sofa, bàn ghế và decor tinh giản mang phong cách Bắc Âu cho mọi căn hộ hiện đại.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <button onClick={() => navigate('/products')} className="bg-black px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-neutral-900 transition-colors">
              Xem sản phẩm
            </button>
            <button onClick={() => navigate('/products')} className="border-2 border-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              Bộ sưu tập mới
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
