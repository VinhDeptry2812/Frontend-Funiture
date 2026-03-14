import React, { useState, useEffect } from 'react';
import { AdminHeader } from '../layout/AdminHeader';
import { Plus, Search, Edit2, Trash2, List } from 'lucide-react';
import categoryService from '../../../Service/categoryService';

// Dữ liệu mẫu (Mock data) để bạn (User) tiện thiết kế giao diện.
// Sau này bạn sẽ thay thế bằng dữ liệu gọi từ API categoryService.
const MOCK_CATEGORIES = [
  { id: 1, name: 'Phòng khách', description: 'Nội thất cho phòng khách', status: 'active', productCount: 45 },
  { id: 2, name: 'Phòng ngủ', description: 'Nội thất cho phòng ngủ', status: 'active', productCount: 32 },
  { id: 3, name: 'Phòng bếp', description: 'Nội thất nhà bếp và phòng ăn', status: 'active', productCount: 28 },
  { id: 4, name: 'Văn phòng', description: 'Nội thất văn phòng, bàn ghế làm việc', status: 'inactive', productCount: 15 },
];

export const AdminCategories: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Các hàm xử lý sự kiện (Handler) trống để bạn tự bề bổ sung logic gọi API sau này
  const handleEdit = (id: number) => {
    console.log('Edit category', id);
    // Mở modal sửa
  };

  const handleDelete = (id: number) => {
    console.log('Delete category', id);
    // Hiện confirm và gọi API xoá
  };

  const handleAddNew = () => {
    console.log('Add new category');
    // Mở modal thêm mới
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await categoryService.getCategory();
        console.log(response);
      }
      catch (error) {
        console.error("Lỗi lấy dữ liệu danh mục", error);
      }

    }
    fetchCategory();
  }, []);


  return (
    <>
      <AdminHeader title="Quản lý danh mục" />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-neutral-100 p-6">

          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                autoComplete='username'
                type="text"
                placeholder="Tìm kiếm danh mục..."
                className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button
              onClick={handleAddNew}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              Thêm danh mục
            </button>
          </div>

          {/* Categories Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50/50">
                  <th className="pb-3 pt-3 px-4 text-xs font-bold uppercase tracking-widest text-neutral-500 rounded-tl-lg">ID</th>
                  <th className="pb-3 pt-3 px-4 text-xs font-bold uppercase tracking-widest text-neutral-500">Tên danh mục</th>
                  <th className="pb-3 pt-3 px-4 text-xs font-bold uppercase tracking-widest text-neutral-500">Mô tả</th>
                  <th className="pb-3 pt-3 px-4 text-xs font-bold uppercase tracking-widest text-neutral-500 text-center">Sản phẩm</th>
                  <th className="pb-3 pt-3 px-4 text-xs font-bold uppercase tracking-widest text-neutral-500 text-center">Trạng thái</th>
                  <th className="pb-3 pt-3 px-4 text-xs font-bold uppercase tracking-widest text-neutral-500 text-right rounded-tr-lg">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_CATEGORIES.map((category) => (
                  <tr key={category.id} className="border-b border-neutral-50 last:border-0 hover:bg-neutral-50/50 transition-colors">
                    <td className="py-4 px-4 text-sm font-medium text-neutral-500">#{category.id}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                          <List className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-bold text-neutral-900">{category.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-neutral-600">{category.description}</td>
                    <td className="py-4 px-4 text-sm font-medium text-neutral-900 text-center">{category.productCount}</td>
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border
                        ${category.status === 'active'
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : 'bg-neutral-100 text-neutral-600 border-neutral-200'
                        }`}
                      >
                        {category.status === 'active' ? 'Hoạt động' : 'Đã ẩn'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(category.id)}
                          className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Chỉnh sửa"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty State (Dành cho khi API trả về rỗng) */}
            {MOCK_CATEGORIES.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <List className="w-8 h-8 text-neutral-400" />
                </div>
                <h3 className="text-neutral-900 font-bold mb-1">Chưa có danh mục nào</h3>
                <p className="text-sm text-neutral-500 mb-4">Bắt đầu bằng cách tạo danh mục sản phẩm đầu tiên của bạn.</p>
                <button
                  onClick={handleAddNew}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  Thêm danh mục
                </button>
              </div>
            )}

          </div>

          {/* Pagination (Tĩnh) */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-neutral-100">
            <p className="text-sm text-neutral-500">Hiển thị <span className="font-bold text-neutral-900">1</span> đến <span className="font-bold text-neutral-900">{MOCK_CATEGORIES.length}</span> trong <span className="font-bold text-neutral-900">{MOCK_CATEGORIES.length}</span> danh mục</p>
            <div className="flex gap-1">
              <button disabled className="px-3 py-1 border border-neutral-200 text-neutral-400 rounded-md text-sm cursor-not-allowed">Trang trước</button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm font-medium">1</button>
              <button disabled className="px-3 py-1 border border-neutral-200 text-neutral-400 rounded-md text-sm cursor-not-allowed">Trang sau</button>
            </div>
          </div>

        </div>
      </main>
    </>
  );
};
