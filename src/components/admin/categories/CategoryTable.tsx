import React from 'react';
import { Edit2, Trash2, List } from 'lucide-react';

interface CategoryTableProps {
  isLoading: boolean;
  currentItems: any[];
  searchTerm: string;
  onEditClick: (category: any) => void;
  onDeleteClick: (id: number) => void;
  onAddClick: () => void;
  hasCategories: boolean;
}

export const CategoryTable: React.FC<CategoryTableProps> = ({
  isLoading,
  currentItems,
  searchTerm,
  onEditClick,
  onDeleteClick,
  onAddClick,
  hasCategories
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-neutral-100 bg-neutral-50/50">
            <th className="pb-3 pt-3 px-4 text-xs font-bold uppercase tracking-widest text-neutral-500 rounded-tl-lg">ID</th>
            <th className="pb-3 pt-3 px-4 text-xs font-bold uppercase tracking-widest text-neutral-500">Tên danh mục</th>
            <th className="pb-3 pt-3 px-4 text-xs font-bold uppercase tracking-widest text-neutral-500">Mô tả</th>
            <th className="pb-3 pt-3 px-4 text-xs font-bold uppercase tracking-widest text-neutral-500 text-center">Danh mục cha</th>
            <th className="pb-3 pt-3 px-4 text-xs font-bold uppercase tracking-widest text-neutral-500 text-center">Trạng thái</th>
            <th className="pb-3 pt-3 px-4 text-xs font-bold uppercase tracking-widest text-neutral-500 text-right rounded-tr-lg">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <tr key={`skeleton-${index}`} className="border-b border-neutral-50 last:border-0 animate-pulse">
                <td className="py-4 px-4"><div className="h-4 bg-neutral-200 rounded w-12"></div></td>
                <td className="py-4 px-4"><div className="h-4 bg-neutral-200 rounded w-48"></div></td>
                <td className="py-4 px-4"><div className="h-4 bg-neutral-200 rounded w-32"></div></td>
                <td className="py-4 px-4"><div className="h-4 bg-neutral-200 rounded w-24 mx-auto"></div></td>
                <td className="py-4 px-4 flex justify-center"><div className="h-6 bg-neutral-200 rounded-full w-20"></div></td>
                <td className="py-4 px-4"><div className="flex justify-end gap-2"><div className="h-8 w-8 bg-neutral-200 rounded-lg"></div><div className="h-8 w-8 bg-neutral-200 rounded-lg"></div></div></td>
              </tr>
            ))
          ) : currentItems.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-12 text-center text-neutral-500">
                Không tìm thấy kết quả nào phù hợp với "{searchTerm}"
              </td>
            </tr>
          ) : (
            currentItems.map((category) => (
              <tr key={category.id} className="border-b border-neutral-50 last:border-0 hover:bg-neutral-50/50 transition-colors">
                <td className="py-4 px-4 text-sm font-medium text-neutral-500">#{category.id}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-neutral-900">{category.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-neutral-600 max-w-[200px] truncate" title={category.description}>
                    {category.description || 'Không có mô tả'}
                </td>
                <td className="py-4 px-4 text-sm text-neutral-600 text-center">
                    <span className="bg-neutral-100 px-2.5 py-1 rounded-md text-xs font-semibold">
                        {category.parent ? category.parent.name : 'Danh mục gốc'}
                    </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border
                    ${category.is_active === 1
                      ? 'bg-green-50 text-green-700 border-green-200'
                      : 'bg-neutral-100 text-neutral-600 border-neutral-200'
                    }`}
                  >
                    {category.is_active === 1 ? 'Hoạt động' : 'Đã ẩn'}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEditClick(category)}
                      className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                      title="Chỉnh sửa"
                    >
                      <Edit2 className="w-4 h-4 cursor-pointer" />
                    </button>
                    <button
                      onClick={() => onDeleteClick(category.id)}
                      className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Xóa"
                    >
                      <Trash2 className="w-4 h-4 cursor-pointer" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {!isLoading && !hasCategories && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <List className="w-8 h-8 text-neutral-400" />
          </div>
          <h3 className="text-neutral-900 font-bold mb-1">Chưa có danh mục nào</h3>
          <p className="text-sm text-neutral-500 mb-4">Bắt đầu bằng cách tạo danh mục sản phẩm đầu tiên của bạn.</p>
          <button
            onClick={onAddClick}
            className="bg-black hover:bg-black/80 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm cursor-pointer"
          >
            Thêm danh mục
          </button>
        </div>
      )}
    </div>
  );
};
