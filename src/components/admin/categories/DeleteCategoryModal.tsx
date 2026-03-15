import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
import categoryService from '../../../Service/categoryService';
import { useToast } from '../../../contexts/ToastContext';

interface DeleteCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  categoryIdToDelete: number | null;
}

export const DeleteCategoryModal: React.FC<DeleteCategoryModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess, 
  categoryIdToDelete 
}) => {
  const { showToast } = useToast();

  if (!isOpen || !categoryIdToDelete) return null;

  const confirmDelete = async () => {
    try {
      await categoryService.deleteCategory(categoryIdToDelete);
      showToast("Đã xóa danh mục thành công!", "success");
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Lỗi khi xóa danh mục:', error);
      showToast("Không thể xóa danh mục này (Có thể do danh mục đang chứa sản phẩm)", "error");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Xác nhận xóa
          </h3>
          <button 
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
            type="button"
          >
            <X className="w-5 h-5 cursor-pointer" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <p className="text-neutral-600 text-sm">
            Bạn có chắc chắn muốn xóa danh mục này? Hành động này không thể hoàn tác.
          </p>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-neutral-100 bg-neutral-50 flex items-center justify-end gap-3 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 bg-white border border-neutral-200 hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer"
            type="button"
          >
            Hủy bỏ
          </button>
          <button
            onClick={confirmDelete}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm cursor-pointer"
            type="button"
          >
            Xóa ngay
          </button>
        </div>
      </div>
    </div>
  );
};
