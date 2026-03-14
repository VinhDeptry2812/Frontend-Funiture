import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  onClose: (id: string) => void;
}

const toastStyles: Record<ToastType, { icon: React.ReactNode; color: string; border: string; bg: string }> = {
  success: {
    icon: <CheckCircle className="w-5 h-5 text-emerald-500" />,
    color: 'text-emerald-900',
    border: 'border-emerald-100',
    bg: 'bg-emerald-50/50',
  },
  error: {
    icon: <AlertCircle className="w-5 h-5 text-rose-500" />,
    color: 'text-rose-900',
    border: 'border-rose-100',
    bg: 'bg-rose-50/50',
  },
  info: {
    icon: <Info className="w-5 h-5 text-blue-500" />,
    color: 'text-blue-900',
    border: 'border-blue-100',
    bg: 'bg-blue-50/50',
  },
  warning: {
    icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    color: 'text-amber-900',
    border: 'border-amber-100',
    bg: 'bg-amber-50/50',
  },
};

export const Toast: React.FC<ToastProps> = ({ id, message, type, onClose }) => {
  const style = toastStyles[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      className={`flex items-center gap-4 p-4 min-w-[320px] max-w-md ${style.bg} backdrop-blur-md border ${style.border} shadow-lg rounded-none pointer-events-auto mb-3`}
    >
      <div className="flex-shrink-0">{style.icon}</div>
      <div className={`flex-1 text-sm font-medium ${style.color}`}>{message}</div>
      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 text-neutral-400 hover:text-neutral-900 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};
