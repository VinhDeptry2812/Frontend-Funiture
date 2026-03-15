import React from 'react';
import { ArrowRight, Home, Armchair } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 relative overflow-hidden bg-white">
      {/* Background Outline Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[24rem] md:text-[32rem] font-bold leading-none opacity-[0.03] text-black select-none">
          404
        </span>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-2xl w-full text-center flex flex-col items-center">
        {/* Icon */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-12 text-neutral-200"
        >
          <Armchair className="h-32 w-32 stroke-[1]" />
        </motion.div>

        {/* Typography */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl text-neutral-900 mb-6 font-bold tracking-tight"
        >
          Oops! Trang bạn tìm kiếm không tồn tại.
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-neutral-500 text-lg mb-10 max-w-md leading-relaxed"
        >
          Có thể liên kết đã hỏng hoặc trang đã bị xóa. Hãy để chúng tôi đưa bạn về nhà.
        </motion.p>

        {/* CTA */}
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => navigate('/')}
          className="bg-black text-white px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-neutral-800 transition-all shadow-xl shadow-black/10 flex items-center gap-2 group"
        >
          Trở về Trang chủ
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </div>
  );
};
