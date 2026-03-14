import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  User as UserIcon, 
  Package, 
  MapPin, 
  Heart, 
  Star, 
  LogOut, 
  Camera,
  ChevronRight,
  Loader2
} from 'lucide-react';
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
  }, []);

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
                <div className="relative group mb-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-neutral-50 shadow-inner bg-neutral-100 flex items-center justify-center">
                    {user?.avatar_url ? (
                      <img 
                        src={user.avatar_url} 
                        alt="User Avatar" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserIcon className="w-10 h-10 text-neutral-300" />
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 bg-black text-white rounded-full shadow-lg hover:scale-110 transition-transform text-[10px]">
                    <Camera className="h-4 w-4" />
                  </button>
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
                  <div className="flex items-center gap-6 pb-10 border-b border-neutral-100 mb-10">
                    <div className="w-20 h-20 rounded-full bg-neutral-100 overflow-hidden shadow-inner flex items-center justify-center">
                      <UserIcon className="w-8 h-8 text-neutral-300" />
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-900 mb-1">Ảnh đại diện</h4>
                      <p className="text-sm text-neutral-500 mb-4">Ảnh đại diện giúp tài khoản của bạn thân thiện hơn.</p>
                      <button className="px-6 py-2 bg-neutral-100 text-neutral-900 text-sm font-bold rounded-full hover:bg-neutral-200 transition-colors">
                        Thay đổi ảnh
                      </button>
                    </div>
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
                      <input 
                        className="w-full bg-neutral-50 border-neutral-200 rounded-xl px-4 py-4 text-sm focus:ring-2 focus:ring-black focus:border-black transition-all" 
                        type="date" 
                        value={formData.birthday}
                        onChange={(e) => setFormData({...formData, birthday: e.target.value})}
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
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
};
