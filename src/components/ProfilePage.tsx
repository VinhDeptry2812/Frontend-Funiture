import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  User as UserIcon, 
  Package, 
  MapPin, 
  Heart, 
  Star, 
  LogOut, 
  ChevronRight,
  ChevronLeft,
  Loader2,
  Calendar,
  X,
  Plus,
  Trash2,
  Edit2,
  Check
} from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { authService } from '../Service/authService';
import { useToast } from '../contexts/ToastContext';

interface ProfilePageProps {
  onNavigate: (view: 'home' | 'products' | 'detail' | 'cart' | 'login' | 'register' | 'forgot-password' | 'reset-password' | 'admin-login' | 'profile') => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthday: ''
  });
  const [addresses, setAddresses] = useState<any[]>([]);
  const [isAddrModalOpen, setIsAddrModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authService.getProfile();
        setUser(response.user);
        setFormData({
          name: response.user.name || '',
          email: response.user.email || '',
          phone: response.user.phone || '',
          birthday: response.user.birthday || ''
        });
      } catch (error) {
        showToast('Không thể tải thông tin hồ sơ', 'error');
        onNavigate('login');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
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

  const handleUpdateProfile = async () => {
    setUpdating(true);
    try {
      await authService.updateProfile(formData);
      showToast('Cập nhật hồ sơ thành công', 'success');
      setUser({ ...user, ...formData });
    } catch (error) {
      showToast('Cập nhật hồ sơ thất bại', 'error');
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      showToast('Đã đăng xuất', 'info');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      onNavigate('login');
    } catch (error) {
      // Dù lỗi logout bên server thì client vẫn nên xóa token
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      onNavigate('login');
    }
  };

  const menuItems = [
    { id: 'profile', label: 'Thông tin tài khoản', icon: UserIcon },
    { id: 'orders', label: 'Đơn hàng của tôi', icon: Package },
    { id: 'address', label: 'Sổ địa chỉ', icon: MapPin },
    { id: 'wishlist', label: 'Sản phẩm yêu thích', icon: Heart },
    { id: 'reviews', label: 'Đánh giá sản phẩm', icon: Star },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <Loader2 className="w-10 h-10 animate-spin text-black" />
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 min-h-screen pt-12 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-100">
              <div className="flex flex-col items-center text-center pb-8 border-b border-neutral-100">
                <div className="mb-4">
                  <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center text-2xl font-black shadow-xl">
                    {user?.name?.charAt(0).toUpperCase() || <UserIcon className="w-8 h-8" />}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-neutral-900">{user?.name}</h3>
                <p className="text-sm text-neutral-500">{user?.email}</p>
              </div>

              <nav className="mt-8 space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${
                      activeTab === item.id 
                        ? 'bg-black text-white shadow-md' 
                        : 'text-neutral-600 hover:bg-neutral-50 hover:text-black'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={`h-5 w-5 ${activeTab === item.id ? 'text-white' : 'text-neutral-400 group-hover:text-black'}`} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <ChevronRight className={`h-4 w-4 transition-transform ${activeTab === item.id ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100'}`} />
                  </button>
                ))}

                <div className="pt-8 mt-8 border-t border-neutral-100">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-medium"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="text-sm">Đăng xuất</span>
                  </button>
                </div>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="w-full lg:w-3/4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-10">
                <h1 className="text-4xl font-bold tracking-tight text-neutral-900 mb-2">Hồ sơ của bạn</h1>
                <p className="text-neutral-500 max-w-2xl font-light leading-relaxed">Quản lý thông tin cá nhân của bạn, bao gồm các tùy chọn bảo mật và tùy chỉnh trải nghiệm tại NoiThat.</p>
              </div>

              {activeTab === 'profile' && (
                <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm border border-neutral-100 mb-8">
                  <div className="pb-10 border-b border-neutral-100 mb-10">
                    <h4 className="font-black text-xs uppercase tracking-[0.2em] text-black mb-1">Thông tin cá nhân</h4>
                    <p className="text-sm text-neutral-500">Cập nhật thông tin định danh của bạn tại đây.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-neutral-700 uppercase tracking-wider">Họ và tên</label>
                      <input 
                        className="w-full bg-neutral-50 border-neutral-200 rounded-xl px-4 py-4 text-sm focus:ring-2 focus:ring-black focus:border-black transition-all" 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-neutral-700 uppercase tracking-wider">Email</label>
                      <input 
                        disabled
                        className="w-full bg-neutral-50 border-neutral-200 rounded-xl px-4 py-4 text-sm opacity-60 cursor-not-allowed" 
                        type="email" 
                        value={formData.email}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-neutral-700 uppercase tracking-wider">Số điện thoại</label>
                      <input 
                        className="w-full bg-neutral-50 border-neutral-200 rounded-xl px-4 py-4 text-sm focus:ring-2 focus:ring-black focus:border-black transition-all" 
                        placeholder="Nhập số điện thoại" 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-neutral-700 uppercase tracking-wider">Ngày sinh</label>
                      <CustomDatePicker 
                        value={formData.birthday} 
                        onChange={(val) => setFormData({...formData, birthday: val})} 
                      />
                    </div>
                  </div>

                  <div className="mt-12">
                    <button 
                      onClick={handleUpdateProfile}
                      disabled={updating}
                      className="px-12 py-4 bg-black text-white font-bold uppercase tracking-widest rounded-full hover:bg-neutral-800 transition-all shadow-xl shadow-black/10 flex items-center gap-2"
                    >
                      {updating && <Loader2 className="w-4 h-4 animate-spin" />}
                      Lưu thay đổi
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-100 flex flex-col items-center justify-center py-24 text-center">
                  <Package className="w-16 h-16 text-neutral-200 mb-6" />
                  <h3 className="text-xl font-bold mb-2">Bạn chưa có đơn hàng nào</h3>
                  <p className="text-neutral-500 mb-8 max-w-sm">Khám phá bộ sưu tập nội thất mới nhất và chọn cho mình những món đồ ưng ý.</p>
                  <button 
                    onClick={() => onNavigate('products')}
                    className="bg-black text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-neutral-800 transition-all"
                  >
                    Bắt đầu mua sắm
                  </button>
                </div>
              )}

              {activeTab === 'profile' && (
                <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm border border-neutral-100">
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-neutral-900 mb-1">Bảo mật</h3>
                    <p className="text-sm text-neutral-500">Chúng tôi khuyên bạn nên sử dụng mật khẩu mạnh để bảo mật tài khoản.</p>
                  </div>
                  <button className="px-8 py-3 border-2 border-neutral-200 text-neutral-900 font-bold uppercase tracking-widest rounded-full hover:bg-neutral-50 transition-all text-xs">
                    Thay đổi mật khẩu
                  </button>
                </div>
              )}

              {activeTab === 'address' && (
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
                </div>
              )}
            </motion.div>
          </main>
        </div>
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

// --- Custom Date Picker Component ---
const CustomDatePicker: React.FC<{ value: string; onChange: (val: string) => void }> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'days' | 'years'>('days');
  // Khởi tạo Date từ chuỗi YYYY-MM-DD đảm bảo tính đúng múi giờ địa phương
  const parseLocalDate = (dateStr: string) => {
    if (!dateStr) return new Date();
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
  };
  
  const [viewDate, setViewDate] = useState(parseLocalDate(value));
  
  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const handleDayClick = (day: number) => {
    const year = viewDate.getFullYear();
    const month = String(viewDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const formatted = `${year}-${month}-${dayStr}`;
    onChange(formatted);
    setIsOpen(false);
  };

  const changeMonth = (offset: number) => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
  };

  const handleYearClick = (year: number) => {
    setViewDate(new Date(year, viewDate.getMonth(), 1));
    setView('days');
  };

  const renderDays = () => {
    const totalDays = daysInMonth(viewDate.getFullYear(), viewDate.getMonth());
    const firstDay = firstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth());
    const days = [];
    
    for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} className="h-10 w-10" />);
    }

    for (let d = 1; d <= totalDays; d++) {
      const dateStr = `${viewDate.getFullYear()}-${String(viewDate.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isSelected = value === dateStr;
      days.push(
        <button
          key={d}
          onClick={() => handleDayClick(d)}
          className={`h-10 w-10 flex items-center justify-center rounded-full text-xs font-bold transition-all
            ${isSelected ? 'bg-black text-white' : 'hover:bg-neutral-100 text-neutral-600'}`}
        >
          {d}
        </button>
      );
    }
    return days;
  };

  const renderYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let y = currentYear; y >= currentYear - 100; y--) {
      const isSelected = viewDate.getFullYear() === y;
      years.push(
        <button
          key={y}
          onClick={() => handleYearClick(y)}
          className={`py-2 px-4 rounded-full text-sm font-bold transition-all
            ${isSelected ? 'bg-black text-white' : 'hover:bg-neutral-100 text-neutral-600'}`}
        >
          {y}
        </button>
      );
    }
    return (
      <div className="grid grid-cols-3 gap-2 h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-neutral-200">
        {years}
      </div>
    );
  };

  const monthName = viewDate.toLocaleString('vi-VN', { month: 'long' });

  return (
    <div className="relative">
      <div 
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) setView('days');
        }}
        className="relative group cursor-pointer"
      >
        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-hover:text-black transition-colors" />
        <div className="w-full bg-neutral-50 border border-neutral-100 rounded-xl pl-12 pr-4 py-4 text-sm focus-within:ring-2 focus-within:ring-black min-h-[56px] flex items-center">
            {value ? new Date(value).toLocaleDateString('vi-VN') : <span className="text-neutral-300">Chọn ngày sinh</span>}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute left-0 top-full mt-2 w-[320px] bg-white border border-neutral-100 shadow-2xl rounded-2xl p-6 z-50 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-neutral-50 rounded-full transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setView(view === 'days' ? 'years' : 'days')}
                  className="text-sm font-black uppercase tracking-widest text-black hover:bg-neutral-50 px-3 py-1 rounded-full transition-colors"
                >
                  {monthName} {viewDate.getFullYear()}
                </button>
                <button onClick={() => changeMonth(1)} className="p-2 hover:bg-neutral-50 rounded-full transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {view === 'days' ? (
                <>
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(d => (
                      <div key={d} className="h-10 w-10 flex items-center justify-center text-[10px] font-black text-neutral-300 uppercase">
                        {d}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {renderDays()}
                  </div>
                </>
              ) : renderYears()}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Address Modal Component ---
const AddressModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  onSave: () => void;
  address?: any;
}> = ({ isOpen, onClose, onSave, address }) => {
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
