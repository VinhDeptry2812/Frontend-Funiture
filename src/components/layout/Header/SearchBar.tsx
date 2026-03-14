import React from 'react';
import { Search } from 'lucide-react';

export const SearchBar: React.FC = () => {
  return (
    <div className="hidden sm:flex items-center bg-neutral-100 rounded-full px-4 py-2 w-48 lg:w-64">
      <Search className="h-4 w-4 text-neutral-400" />
      <input 
        type="text" 
        placeholder="Tìm kiếm..." 
        className="bg-transparent border-none focus:ring-0 text-sm w-full ml-2"
      />
    </div>
  );
};
