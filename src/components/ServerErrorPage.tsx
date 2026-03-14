import React from 'react';
import { RefreshCcw, LifeBuoy, CloudOff } from 'lucide-react';
import { motion } from 'motion/react';

interface ServerErrorPageProps {
  onNavigate: (view: string) => void;
}

export const ServerErrorPage: React.FC<ServerErrorPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 relative overflow-hidden bg-white">
      {/* Background Outline Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[24rem] md:text-[32rem] font-bold leading-none opacity-[0.03] text-black select-none">
          500
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
          <CloudOff className="h-32 w-32 stroke-[1]" />
        </motion.div>

        {/* Typography */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl text-neutral-900 mb-6 font-bold tracking-tight"
        >
          Đã xảy ra lỗi hệ thống.
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-neutral-500 text-lg mb-10 max-w-md leading-relaxed"
        >
          Xin lỗi vì sự bất tiện này. Đội ngũ kỹ thuật của chúng tôi đang khắc phục sự cố. Vui lòng thử lại sau ít phút.
        </motion.p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => window.location.reload()}
            className="bg-black text-white px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-neutral-800 transition-all shadow-xl shadow-black/10 flex items-center gap-2 group"
          >
            <RefreshCcw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
            Tải lại trang
          </motion.button>
          
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={() => onNavigate('contact')}
            className="border border-neutral-200 text-neutral-900 px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-neutral-50 transition-all flex items-center gap-2 group"
          >
            <LifeBuoy className="h-4 w-4" />
            Liên hệ hỗ trợ
          </motion.button>
        </div>
      </div>
    </div>
  );
};
