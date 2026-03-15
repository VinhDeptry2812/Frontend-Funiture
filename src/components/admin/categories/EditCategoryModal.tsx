import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import categoryService from '../../../Service/categoryService';
import { useToast } from '../../../contexts/ToastContext';

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  categoryList: any[];
  categoryToEdit: any;
}

export const EditCategoryModal: React.FC<EditCategoryModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess, 
  categoryList, 
  categoryToEdit 
}) => {
  const { showToast } = useToast();
  const [editCategory, setEditCategory] = useState({
    name: '',
    description: '',
    parent_id: '',
    is_active: 1,
    sort_order: 0
  });

  useEffect(() => {
    if (categoryToEdit) {
      setEditCategory({
        name: categoryToEdit.name || '',
        description: categoryToEdit.description || '',
        parent_id: categoryToEdit.parent_id ? categoryToEdit.parent_id.toString() : '',
        is_active: categoryToEdit.is_active !== undefined ? categoryToEdit.is_active : 1,
        sort_order: categoryToEdit.sort_order || 0
      });
    }
  }, [categoryToEdit]);

  if (!isOpen || !categoryToEdit) return null;

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSubmit = {
        ...editCategory,
        parent_id: editCategory.parent_id ? parseInt(editCategory.parent_id) : null,
        sort_order: editCategory.sort_order ? parseInt(editCategory.sort_order.toString()) : 0
      };

      await categoryService.updateCategory(categoryToEdit.id, dataToSubmit);
      showToast("Cập nhật danh mục thành công!", "success");
      
      onSuccess();
      onClose();
      
    } catch (error) {
      console.error("Lỗi cập nhật danh mục:", error);
      showToast("Có lỗi xảy ra khi cập nhật danh mục!", "error");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <h3 className="text-lg font-bold text-neutral-900">Sửa danh mục</h3>
          <button 
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
            type="button"
          >
            <X className="w-5 h-5 cursor-pointer" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleEditSubmit}>
          <div className="p-6 space-y-5">
            
            {/* Tên danh mục */}
            <div>
              <label htmlFor="edit_name" className="block text-sm font-medium text-neutral-700 mb-1">
                Tên danh mục <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="edit_name"
                required
                placeholder="VD: Phòng khách, Sofa..."
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                value={editCategory.name}
                onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
              />
            </div>

            {/* Danh mục cha */}
            <div>
              <label htmlFor="edit_parent_id" className="block text-sm font-medium text-neutral-700 mb-1">
                Danh mục cha
              </label>
              <select
                id="edit_parent_id"
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm bg-white cursor-pointer"
                value={editCategory.parent_id}
                onChange={(e) => setEditCategory({ ...editCategory, parent_id: e.target.value })}
              >
                <option value="">-- Mục gốc (Không có cha) --</option>
                {categoryList?.filter(cat => cat.id !== categoryToEdit.id).map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Mô tả */}
            <div>
              <label htmlFor="edit_description" className="block text-sm font-medium text-neutral-700 mb-1">
                Mô tả ngắn
              </label>
              <textarea
                id="edit_description"
                rows={3}
                placeholder="Mô tả về danh mục này..."
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm resize-none"
                value={editCategory.description}
                onChange={(e) => setEditCategory({ ...editCategory, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Trạng thái */}
              <div>
                <label htmlFor="edit_is_active" className="block text-sm font-medium text-neutral-700 mb-1">
                  Trạng thái
                </label>
                <select
                  id="edit_is_active"
                  className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm bg-white cursor-pointer"
                  value={editCategory.is_active}
                  onChange={(e) => setEditCategory({ ...editCategory, is_active: Number(e.target.value) })}
                >
                  <option value={1}>Hoạt động</option>
                  <option value={0}>Ẩn</option>
                </select>
              </div>

              {/* Thứ tự */}
              <div>
                <label htmlFor="edit_sort_order" className="block text-sm font-medium text-neutral-700 mb-1">
                  Thứ tự hiển thị
                </label>
                <input
                  type="number"
                  id="edit_sort_order"
                  min="0"
                  className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                  value={editCategory.sort_order}
                  onChange={(e) => setEditCategory({ ...editCategory, sort_order: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 border-t border-neutral-100 bg-neutral-50 flex items-center justify-end gap-3 rounded-b-2xl">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 bg-white border border-neutral-200 hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-black/80 rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
