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
  Loader2
} from 'lucide-react';
import { authService } from '../../Service/authService';
import { useToast } from '../../contexts/ToastContext';
import { ProfileInfo } from '../features/profile/ProfileInfo';
import { OrderList } from '../features/profile/OrderList';
import { AddressManager } from '../features/profile/AddressManager';
import { SecuritySettings } from '../features/profile/SecuritySettings';
import { useNavigate } from 'react-router-dom';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authService.getProfile();
        setUser(response.user);
      } catch (error) {
        showToast('Không thể tải thông tin hồ sơ', 'error');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      showToast('Đã đăng xuất', 'info');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
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
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-10">
                <h1 className="text-4xl font-bold tracking-tight text-neutral-900 mb-2">
                  {menuItems.find(i => i.id === activeTab)?.label || 'Hồ sơ'}
                </h1>
                <p className="text-neutral-500 max-w-2xl font-light leading-relaxed">
                  Quản lý thông tin cá nhân của bạn, bao gồm các tùy chọn bảo mật và tùy chỉnh trải nghiệm tại NoiThat.
                </p>
              </div>

              {activeTab === 'profile' && (
                <>
                  <ProfileInfo user={user} onUpdate={(updatedUser) => setUser(updatedUser)} />
                  <SecuritySettings />
                </>
              )}

              {activeTab === 'orders' && (
                <OrderList />
              )}

              {activeTab === 'address' && (
                <AddressManager />
              )}

              {['wishlist', 'reviews'].includes(activeTab) && (
                <div className="bg-white rounded-2xl p-16 shadow-sm border border-neutral-100 flex flex-col items-center justify-center text-center">
                  <Star className="w-12 h-12 text-neutral-200 mb-4" />
                  <p className="text-neutral-500">Tính năng đang được phát triển.</p>
                </div>
              )}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
};
