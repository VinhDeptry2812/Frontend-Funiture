import React, { useEffect, useState } from 'react';
import { data, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { authService } from '../../../Service/authService';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Users, 
  BarChart2, 
  Settings,
  Armchair,
  List,
  LogOut,
  AlertTriangle,
  X
} from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = async () => {
    try {
      await authService.logoutAdmin();
    } catch (error) {
      console.error('Lỗi đăng xuất API:', error);
    } finally {
      // Luôn xóa token và chuyển trang dù gọi API có lỗi hay không
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_info');
      setIsLogoutModalOpen(false);
      navigate('/admin/login');
    }
  };


  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
    { path: '/admin/categories', icon: List, label: 'Categories' },
    { path: '/admin/products', icon: Package, label: 'Products' },
    { path: '/admin/customers', icon: Users, label: 'Customers' },
    { path: '/admin/reports', icon: BarChart2, label: 'Reports' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  const [adminProfile, setAdminProfile] = useState({
    admin:{
      name:'',
      role:''
    }
  });

  useEffect(() => {
      const fetchAdminProfile = async () => {
        try {
          const response = await authService.getAdminProfile();
          setAdminProfile(response);
        } catch (error) {
          console.error('Tải thông tin admin thất bại:', error);
        }
      };
      fetchAdminProfile();
    }, []);
  

  return (
    <aside className="w-64 bg-[#1e1e24] text-neutral-400 h-screen fixed left-0 top-0 flex flex-col z-20 overflow-y-auto">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-8">
        <div className="bg-black p-2 rounded-lg text-white">
          <Armchair className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-white font-bold text-lg leading-tight uppercase tracking-tight">NoiThat</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname.includes(item.path);
            const Icon = item.icon;
            
            return (
              <li key={item.path} className="px-3">
                <NavLink
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-neutral-800 text-white' 
                      : 'hover:bg-neutral-800/50 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 w-1 h-8 bg-blue-600 rounded-r-full" />
                  )}
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-500' : ''}`} />
                  <span className="font-medium text-sm">{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info */}
      <div className="p-6 border-t border-neutral-800 flex items-center gap-3 mt-auto">
        <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center overflow-hidden">
           <img src="https://ui-avatars.com/api/?name=Le+Hoang&background=f3f4f6&color=000" alt="Le Hoang" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="text-sm font-bold text-white truncate">{adminProfile.admin.name?adminProfile.admin.name:'Unknown'}</p>
          <p className="text-[11px] text-neutral-500 truncate">{adminProfile.admin.role?adminProfile.admin.role:'Unknown'}</p>
        </div>
        <button 
          onClick={handleLogoutClick}
          className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50/10 rounded-lg transition-colors"
          title="Đăng xuất"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
              <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Đăng xuất
              </h3>
              <button 
                onClick={() => setIsLogoutModalOpen(false)}
                className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-neutral-600 text-sm">
                Bạn có chắc chắn muốn đăng xuất khỏi tài khoản quản trị viên không? Bạn sẽ cần đăng nhập lại để tiếp tục thao tác.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-neutral-100 bg-neutral-50 flex items-center justify-end gap-3 rounded-b-2xl">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 bg-white border border-neutral-200 hover:bg-neutral-50 rounded-lg transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
