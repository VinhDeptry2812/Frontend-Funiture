import React, { useEffect, useState } from 'react';
import { data, NavLink, useLocation } from 'react-router-dom';
import { authService } from '../../../Service/authService';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Users, 
  BarChart2, 
  Settings,
  Armchair,
  List
} from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const location = useLocation();

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
        <button className="text-neutral-500 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
    </aside>
  );
};
