import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Loader2 } from 'lucide-react';
import { authService } from '../../../../Service/authService';
import { useToast } from '../../../../contexts/ToastContext';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  address?: any;
}

export const AddressModal: React.FC<AddressModalProps> = ({ isOpen, onClose, onSave, address }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    receiver_name: '',
    receiver_phone: '',
    address_detail: '',
    type: 'home',
    is_default: false
  });
  const { showToast } = useToast();

  useEffect(() => {
    if (address) {
      setFormData({
        receiver_name: address.receiver_name || '',
        receiver_phone: address.receiver_phone || '',
        address_detail: address.address_detail || '',
        type: address.type || 'home',
        is_default: !!address.is_default
      });
    } else {
      setFormData({
        receiver_name: '',
        receiver_phone: '',
        address_detail: '',
        type: 'home',
        is_default: false
      });
    }
  }, [address, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (address) {
        await authService.updateAddress(address.id, formData);
        showToast('Cập nhật địa chỉ thành công', 'success');
      } else {
        await authService.addAddress(formData);
        showToast('Thêm địa chỉ thành công', 'success');
      }
      onSave();
    } catch (error) {
      showToast('Có lỗi xảy ra, vui lòng thử lại', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="p-8 border-b border-neutral-100 flex items-center justify-between">
              <h2 className="text-2xl font-black text-neutral-900 uppercase tracking-tight">
                {address ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới'}
              </h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-neutral-50 rounded-full transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-neutral-400 uppercase tracking-widest">Họ tên người nhận</label>
                  <input 
                    required
                    className="w-full bg-neutral-50 border-neutral-100 rounded-xl px-4 py-4 text-sm focus:ring-2 focus:ring-black focus:border-black transition-all"
                    placeholder="VD: Nguyễn Văn A"
                    value={formData.receiver_name}
                    onChange={(e) => setFormData({...formData, receiver_name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-neutral-400 uppercase tracking-widest">Số điện thoại</label>
                  <input 
                    required
                    className="w-full bg-neutral-50 border-neutral-100 rounded-xl px-4 py-4 text-sm focus:ring-2 focus:ring-black focus:border-black transition-all"
                    placeholder="VD: 0987654321"
                    value={formData.receiver_phone}
                    onChange={(e) => setFormData({...formData, receiver_phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-neutral-400 uppercase tracking-widest">Địa chỉ chi tiết</label>
                <textarea 
                  required
                  rows={3}
                  className="w-full bg-neutral-50 border-neutral-100 rounded-xl px-4 py-4 text-sm focus:ring-2 focus:ring-black focus:border-black transition-all resize-none"
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố..."
                  value={formData.address_detail}
                  onChange={(e) => setFormData({...formData, address_detail: e.target.value})}
                />
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-4">
                <div className="flex items-center gap-4">
                  {(['home', 'office', 'other'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({...formData, type})}
                      className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                        formData.type === type 
                          ? 'bg-black text-white shadow-lg scale-105' 
                          : 'bg-neutral-50 text-neutral-400 hover:text-black'
                      }`}
                    >
                      {type === 'home' ? 'Nhà riêng' : type === 'office' ? 'Văn phòng' : 'Khác'}
                    </button>
                  ))}
                </div>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox"
                    checked={formData.is_default}
                    onChange={(e) => setFormData({...formData, is_default: e.target.checked})}
                    className="w-5 h-5 rounded border-neutral-200 text-black focus:ring-black cursor-pointer"
                  />
                  <span className="text-sm font-bold text-neutral-600 group-hover:text-black transition-colors">Đặt làm mặc định</span>
                </label>
              </div>

              <div className="pt-8">
                <button 
                  disabled={loading}
                  type="submit"
                  className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-black/20 hover:bg-neutral-800 transition-all flex items-center justify-center gap-3"
                >
                  {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                  {address ? 'Cập nhật địa chỉ' : 'Lưu địa chỉ'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
