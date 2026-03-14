import React from 'react';
import { User, Loader2 } from 'lucide-react';

interface UserMenuProps {
  user: any;
  loading: boolean;
  onNavigate: (view: any) => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ user, loading, onNavigate }) => {
  return (
    <button 
      className="group flex items-center justify-center transition-all" 
      title={user ? `Xin chào, ${user.name}` : "Tài khoản"}
      onClick={() => onNavigate('profile')}
    >
      <div className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin text-neutral-400" />
        ) : user ? (
          <div className="h-7 w-7 bg-black text-white rounded-full flex items-center justify-center text-[10px] font-black uppercase tracking-tighter ring-2 ring-white ring-offset-1 group-hover:scale-110 transition-transform">
            {user.name?.charAt(0) || 'U'}
          </div>
        ) : (
          <User className="h-6 w-6 text-neutral-600" />
        )}
      </div>
    </button>
  );
};
