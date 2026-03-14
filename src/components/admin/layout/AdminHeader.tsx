import React from 'react';
import { Search, Bell } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ title }) => {
  return (
    <header className="h-20 bg-white flex items-center justify-between px-8 border-b border-neutral-100 sticky top-0 z-10">
      <div className="flex items-center gap-8 flex-1">
        <h2 className="text-xl font-bold text-neutral-900 min-w-max">{title}</h2>
          
      </div>

      <div className="flex items-center gap-6">

        {/* Notifications */}
        <button className="relative text-neutral-500 hover:text-black transition-colors w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-50">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* Language Selector */}
        <div className="flex items-center gap-1 cursor-pointer group px-2 py-1 hover:bg-neutral-50 rounded-lg">
          <span className="text-sm font-medium text-neutral-600 group-hover:text-black">VN</span>
          <svg className="w-4 h-4 text-neutral-400 group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </header>
  );
};
