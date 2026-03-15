import React from 'react';
import { AdminHeader } from '../layout/AdminHeader';
import { Plus, Search } from 'lucide-react';
import { ProductTable } from '../products/ProductTable';

export const AdminProducts: React.FC = () => {
  return (
    <>
      <AdminHeader title="Quản lý sản phẩm" />

      <main className="flex-1 p-8 overflow-y-auto relative">
        <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-neutral-100 p-6">

          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                autoComplete='off'
                type="text"
                placeholder="Tìm kiếm sản phẩm theo tên, mã SKU..."
                className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              />
            </div>

            <button
              // Thêm sự kiện onClick để navigate sang trang AdminProductCreate
              className="flex cursor-pointer items-center gap-2 bg-black hover:bg-black/80 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              Thêm sản phẩm mới
            </button>
          </div>

          <ProductTable />

          {/* Phân trang UI tạm thời (bạn sẽ gắn logic thật vào sau) */}
          <div className="flex items-center justify-end mt-6 pt-6 border-t border-neutral-100">
            <div className="flex gap-1">
              <button disabled className="px-3 py-1 border border-neutral-200 rounded-md text-sm cursor-not-allowed text-neutral-400 bg-neutral-50 opacity-50">
                Trang trước
              </button>
              <button className="px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer bg-black text-white">
                1
              </button>
              <button className="px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer text-neutral-600 hover:bg-neutral-50 border border-transparent hover:border-neutral-200">
                2
              </button>
              <button className="px-3 py-1 border border-neutral-200 rounded-md text-sm cursor-pointer transition-colors text-neutral-600 hover:bg-neutral-50">
                Trang sau
              </button>
            </div>
          </div>

        </div>
      </main>
    </>
  );
};
