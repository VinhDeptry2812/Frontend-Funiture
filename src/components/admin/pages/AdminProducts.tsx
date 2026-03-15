import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 Thêm useNavigate
import { AdminHeader } from '../layout/AdminHeader';
import { Plus, Search } from 'lucide-react';
import { ProductTable } from '../products/ProductTable';
import { productService } from '@/src/Service/productService';

export interface Category {
  id: number;
  name: string;
  slug: string;
  is_active: boolean;
}

export interface Variant {
  id: number;
  sku: string;
  price: number;
  stock_quantity: number;
  color?: string;
  size?: string;
}

export interface TypeProduct {
  id: number;
  category_id: number;
  name: string;
  sku: string;
  base_price: number;  
  sale_price?: number; 
  image_url?: string;  
  is_active: boolean;  
  category: Category;  
  variants: Variant[]; 
  //sold?: number;      
}



export const AdminProducts: React.FC = () => {
  const navigate = useNavigate(); // 👈 Khai báo navigate
  const [productsList, setProductsList] = useState<TypeProduct[]>([]);
  
  // 1. Thêm State lưu trữ Cursor Phân trang
  const [pagination, setPagination] = useState<{
    next_cursor: string | null;
    prev_cursor: string | null;
    total: number; // 👈 Thêm trường tổng sản phẩm
  }>({ next_cursor: null, prev_cursor: null, total: 0 });

  // cursor hiện tại đang dùng để gọi API
  const [currentCursor, setCurrentCursor] = useState<string | null>(null);

  // 2. Thêm State Loading
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 3. State cho Tìm kiếm
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');

  // ⏰ Debounce Search: Ngăn spam API liên tục khi gõ phím
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentCursor(null); // Reset phân trang về trang đầu khi tìm kiếm
    }, 500); // Chờ 500ms sau khi ngừng gõ

    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true); 
      try {
        const response = await productService.getProducts({ 
          cursor: currentCursor || undefined,
          search: debouncedSearchTerm || undefined, // 👈 Đẩy từ khóa tìm kiếm lên API
          all: true // Admin xem full
        });
        setProductsList(response.data);
        setPagination({
          next_cursor: response.next_cursor,
          prev_cursor: response.prev_cursor,
          total: response.total ?? 0 
        });
      }
      catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false); 
      }
    }
    getProducts();
  }, [currentCursor, debouncedSearchTerm]) // 👈 Lắng nghe cả hai thay đổi


  return (
    <>
      <AdminHeader title="Quản lý sản phẩm" />

      <main className="flex-1 p-8 overflow-y-auto relative">
        <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-neutral-100 p-6">

          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  autoComplete='off'
                  type="text"
                  placeholder="Tìm kiếm sản phẩm theo tên, mã SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                />
              </div>
              <span className="text-xs font-bold text-neutral-500 bg-neutral-100 px-2 py-1.5 rounded-md whitespace-nowrap border border-neutral-200/50">
                Tổng: {pagination.total} SP
              </span>
            </div>

            <button
              onClick={() => navigate('create')} // 👈 Chuyển hướng sang trang Tạo
              className="flex cursor-pointer items-center gap-2 bg-black hover:bg-black/80 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              Thêm sản phẩm mới
            </button>
          </div>

          {isLoading ? (
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border-b border-neutral-50 last:border-0">
                  <div className="w-12 h-12 bg-neutral-200 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-neutral-200 rounded w-1/3"></div>
                    <div className="h-3 bg-neutral-100 rounded w-1/4"></div>
                  </div>
                  <div className="w-20 h-4 bg-neutral-100 rounded"></div>
                  <div className="w-24 h-4 bg-neutral-100 rounded"></div>
                  <div className="w-16 h-4 bg-neutral-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <ProductTable products={productsList} />
          )}

          {/* Phân trang UI (Cursor-based Pagination) */}
          <div className="flex items-center justify-end mt-6 pt-6 border-t border-neutral-100">
            <div className="flex gap-2">
              <button 
                disabled={!pagination.prev_cursor} 
                onClick={() => setCurrentCursor(pagination.prev_cursor)}
                className={`px-4 py-1.5 border rounded-md text-sm font-medium transition-all cursor-pointer text-neutral-600 border-neutral-200 hover:bg-neutral-50
                  ${!pagination.prev_cursor ? 'opacity-40 cursor-not-allowed bg-neutral-50/50 border-neutral-100' : ''}`}
              >
                 Trang trước
              </button>
              
              <button 
                disabled={!pagination.next_cursor} 
                onClick={() => setCurrentCursor(pagination.next_cursor)}
                className={`px-4 py-1.5 border rounded-md text-sm font-medium transition-all cursor-pointer text-neutral-600 border-neutral-200 hover:bg-neutral-50
                  ${!pagination.next_cursor ? 'opacity-40 cursor-not-allowed bg-neutral-50/50 border-neutral-100' : ''}`}
              >
                Trang sau 
              </button>
            </div>
          </div>

        </div>
      </main>
    </>
  );
};

