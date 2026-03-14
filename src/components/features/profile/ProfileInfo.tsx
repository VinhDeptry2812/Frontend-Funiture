import React, { useState, useEffect } from 'react';
import { authService } from '../../../Service/authService';
import { useToast } from '../../../contexts/ToastContext';
import { CustomDatePicker } from '../../ui/CustomDatePicker';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';

interface ProfileInfoProps {
  user: any;
  onUpdate: (updatedUser: any) => void;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ user, onUpdate }) => {
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthday: ''
  });
  const { showToast } = useToast();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        birthday: user.birthday || ''
      });
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    setUpdating(true);
    try {
      await authService.updateProfile(formData);
      showToast('Cập nhật hồ sơ thành công', 'success');
      onUpdate({ ...user, ...formData });
    } catch (error) {
      showToast('Cập nhật hồ sơ thất bại', 'error');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm border border-neutral-100 mb-8">
      <div className="pb-10 border-b border-neutral-100 mb-10">
        <h4 className="font-black text-xs uppercase tracking-[0.2em] text-black mb-1">Thông tin cá nhân</h4>
        <p className="text-sm text-neutral-500">Cập nhật thông tin định danh của bạn tại đây.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Input 
          label="Họ và tên"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        <Input 
          label="Email"
          disabled
          value={formData.email}
          type="email"
        />
        <Input 
          label="Số điện thoại"
          placeholder="Nhập số điện thoại"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
        />
        <div className="space-y-2">
          <label className="text-sm font-bold text-neutral-700 uppercase tracking-wider">Ngày sinh</label>
          <CustomDatePicker 
            value={formData.birthday} 
            onChange={(val) => setFormData({...formData, birthday: val})} 
          />
        </div>
      </div>

      <div className="mt-12">
        <Button 
          onClick={handleUpdateProfile}
          isLoading={updating}
          size="lg"
        >
          Lưu thay đổi
        </Button>
      </div>
    </div>
  );
};
