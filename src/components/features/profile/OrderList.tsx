import React from 'react';
import { Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const OrderList: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-100 flex flex-col items-center justify-center py-24 text-center">
      <Package className="w-16 h-16 text-neutral-200 mb-6" />
      <h3 className="text-xl font-bold mb-2">Bạn chưa có đơn hàng nào</h3>
      <p className="text-neutral-500 mb-8 max-w-sm">Khám phá bộ sưu tập nội thất mới nhất và chọn cho mình những món đồ ưng ý.</p>
      <button 
        onClick={() => navigate('/products')}
        className="bg-black text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-neutral-800 transition-all"
      >
        Bắt đầu mua sắm
      </button>
    </div>
  );
};
