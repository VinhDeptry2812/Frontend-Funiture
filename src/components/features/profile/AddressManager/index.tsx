import React, { useState, useEffect } from 'react';
import { MapPin, Plus, Check, Edit2, Trash2 } from 'lucide-react';
import { authService } from '../../../../Service/authService';
import { useToast } from '../../../../contexts/ToastContext';
import { AddressModal } from './AddressModal';

export const AddressManager: React.FC = () => {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [isAddrModalOpen, setIsAddrModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any>(null);
  const { showToast } = useToast();

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const data = await authService.getAddresses();
      setAddresses(data);
    } catch (error) {
      console.error('Lỗi khi tải địa chỉ:', error);
    }
  };

  const handleSetDefaultAddress = async (id: number) => {
    try {
      await authService.setDefaultAddress(id);
      showToast('Đã đặt làm địa chỉ mặc định', 'success');
      fetchAddresses();
    } catch (error) {
      showToast('Không thể đặt địa chỉ mặc định', 'error');
    }
  };

  const handleDeleteAddress = async (id: number) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa địa chỉ này?')) return;
    try {
      await authService.deleteAddress(id);
      showToast('Xóa địa chỉ thành công', 'success');
      fetchAddresses();
    } catch (error) {
      showToast('Không thể xóa địa chỉ', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm border border-neutral-100 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-neutral-900 mb-1">Địa chỉ nhận hàng</h3>
          <p className="text-sm text-neutral-500">Quản lý các địa chỉ giao hàng của bạn để thanh toán nhanh hơn.</p>
        </div>
        <button 
          onClick={() => {
            setEditingAddress(null);
            setIsAddrModalOpen(true);
          }}
          className="bg-black text-white px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-neutral-800 transition-all shadow-lg"
        >
          <Plus className="w-4 h-4" /> Thêm địa chỉ
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {addresses.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 shadow-sm border border-neutral-100 flex flex-col items-center justify-center text-center">
            <MapPin className="w-12 h-12 text-neutral-200 mb-4" />
            <p className="text-neutral-500">Bạn chưa có địa chỉ nào được lưu.</p>
          </div>
        ) : (
          addresses.map((addr) => (
            <div 
              key={addr.id}
              className={`bg-white rounded-2xl p-8 shadow-sm border transition-all ${
                addr.is_default ? 'border-neutral-900 ring-1 ring-neutral-900' : 'border-neutral-100'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-neutral-900 text-lg">{addr.receiver_name}</span>
                    {addr.is_default && (
                      <span className="bg-neutral-900 text-white text-[10px] px-2 py-1 rounded font-black uppercase tracking-wider flex items-center gap-1">
                        <Check className="w-3 h-3" /> Mặc định
                      </span>
                    )}
                    <span className="bg-neutral-100 text-neutral-600 text-[10px] px-2 py-1 rounded font-black uppercase tracking-wider">
                      {addr.type === 'home' ? 'Nhà riêng' : addr.type === 'office' ? 'Văn phòng' : 'Khác'}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-neutral-500 font-medium">
                    <p className="flex items-center gap-2 font-bold text-neutral-700">
                      SĐT: {addr.receiver_phone}
                    </p>
                    <p>{addr.address_detail}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 md:self-start">
                  {!addr.is_default && (
                    <button 
                      onClick={() => handleSetDefaultAddress(addr.id)}
                      className="text-xs font-bold text-neutral-400 hover:text-black transition-colors px-4 py-2"
                    >
                      Thiết lập mặc định
                    </button>
                  )}
                  <div className="h-4 w-[1px] bg-neutral-100 hidden md:block mx-2" />
                  <button 
                    onClick={() => {
                      setEditingAddress(addr);
                      setIsAddrModalOpen(true);
                    }}
                    className="p-2 text-neutral-400 hover:text-black hover:bg-neutral-50 rounded-lg transition-all"
                    title="Chỉnh sửa"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteAddress(addr.id)}
                    className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    title="Xóa"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <AddressModal 
        isOpen={isAddrModalOpen}
        onClose={() => setIsAddrModalOpen(false)}
        onSave={() => {
          fetchAddresses();
          setIsAddrModalOpen(false);
        }}
        address={editingAddress}
      />
    </div>
  );
};
