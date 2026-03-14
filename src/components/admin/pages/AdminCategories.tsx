import React, { useState, useEffect } from 'react';
import { AdminHeader } from '../layout/AdminHeader';
import { Plus, Search, Edit2, Trash2, List, X, AlertTriangle } from 'lucide-react';
import categoryService from '../../../Service/categoryService';
import { useToast } from '../../../contexts/ToastContext';


export const AdminCategories: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryList, setCategoryList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Pagination Details
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Số mục hiển thị trên mỗi trang

  const { showToast } = useToast();

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Selected category for Edit/Delete
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    parent_id: '',
    is_active: 1,
    sort_order: 0
  });

  // State for Editing
  const [editCategory, setEditCategory] = useState({
    name: '',
    description: '',
    parent_id: '',
    is_active: 1,
    sort_order: 0
  });

  const fetchCategory = async () => {
    setIsLoading(true);
    try {
      const response = await categoryService.getCategory();
      setCategoryList(response);
    }
    catch (error) {
      console.error("Lỗi lấy dữ liệu danh mục", error);
      showToast("Lỗi khi tải danh sách danh mục!", "error");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCategory();
  }, []);

  // --- DELETE HANDLERS ---
  const handleDeleteClick = (id: number) => {
    setSelectedCategoryId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedCategoryId) return;
    try {
      await categoryService.deleteCategory(selectedCategoryId);
      showToast("Đã xóa danh mục thành công!", "success");
      setIsDeleteModalOpen(false);
      setSelectedCategoryId(null);
      fetchCategory(); // Reload list
    } catch (error) {
      console.error('Lỗi khi xóa danh mục:', error);
      showToast("Không thể xóa danh mục này (Có thể do danh mục đang chứa sản phẩm)", "error");
    }
  };

  // --- EDIT HANDLERS ---
  const handleEditClick = (category: any) => {
    setSelectedCategoryId(category.id);
    setEditCategory({
      name: category.name || '',
      description: category.description || '',
      parent_id: category.parent_id ? category.parent_id.toString() : '',
      is_active: category.is_active !== undefined ? category.is_active : 1,
      sort_order: category.sort_order || 0
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategoryId) return;
    
    try {
      const dataToSubmit = {
        ...editCategory,
        parent_id: editCategory.parent_id ? parseInt(editCategory.parent_id) : null,
        sort_order: editCategory.sort_order ? parseInt(editCategory.sort_order.toString()) : 0
      };

      await categoryService.updateCategory(selectedCategoryId, dataToSubmit);
      showToast("Cập nhật danh mục thành công!", "success");
      
      setIsEditModalOpen(false);
      setSelectedCategoryId(null);
      fetchCategory();
      
    } catch (error) {
      console.error("Lỗi cập nhật danh mục:", error);
      showToast("Có lỗi xảy ra khi cập nhật danh mục!", "error");
    }
  };


  // --- ADD HANDLERS ---
  const handleAddNew = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSubmit = {
        ...newCategory,
        parent_id: newCategory.parent_id ? parseInt(newCategory.parent_id) : null,
        sort_order: newCategory.sort_order ? parseInt(newCategory.sort_order.toString()) : 0
      };

      const response = await categoryService.addCategory(dataToSubmit);
      showToast("Thêm danh mục thành công!", "success");
      
      // Đóng modal và reset form
      setIsAddModalOpen(false);
      setNewCategory({ name: '', description: '', parent_id: '', is_active: 1, sort_order: 0 });
      
      // Load lại danh sách
      fetchCategory();
      
    } catch (error) {
      console.error("Lỗi thêm danh mục:", error);
      showToast("Có lỗi xảy ra khi thêm danh mục!", "error");
    }
  };


  return (
    <>
      <AdminHeader title="Quản lý danh mục" />

      <main className="flex-1 p-8 overflow-y-auto relative">
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
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
                }}
              />
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex cursor-pointer items-center gap-2 bg-black hover:bg-black/80 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm whitespace-nowrap"
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
                  <th className="pb-3 pt-3 px-4 text-xs font-bold uppercase tracking-widest text-neutral-500 text-center">Danh mục cha</th>
                  <th className="pb-3 pt-3 px-4 text-xs font-bold uppercase tracking-widest text-neutral-500 text-center">Trạng thái</th>
                  <th className="pb-3 pt-3 px-4 text-xs font-bold uppercase tracking-widest text-neutral-500 text-right rounded-tr-lg">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  // Skeleton Loading Rows
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
                ) : (
                  (function() {
                    // 1. Phân tích chức năng tìm kiếm
                    const filteredCategories = categoryList?.filter(category => 
                      category.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                      (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
                    ) || [];

                    // 2. Tính toán phân trang dựa trên danh sách đã lọc
                    const indexOfLastItem = currentPage * itemsPerPage;
                    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
                    const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);
                    const totalPages = Math.ceil(filteredCategories.length / itemsPerPage) || 1;

                    if (filteredCategories.length === 0) {
                      return (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-neutral-500">
                            Không tìm thấy kết quả nào phù hợp với "{searchTerm}"
                          </td>
                        </tr>
                      );
                    }

                    return (
                      <>
                        {currentItems.map((category) => (
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
                                  onClick={() => handleEditClick(category)}
                                  className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                  title="Chỉnh sửa"
                                >
                                  <Edit2 className="w-4 h-4 cursor-pointer" />
                                </button>
                                <button
                                  onClick={() => handleDeleteClick(category.id)}
                                  className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                  title="Xóa"
                                >
                                  <Trash2 className="w-4 h-4 cursor-pointer" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </>
                    );
                  })()
                )}
              </tbody>
            </table>



            {/* Empty State */}
            {!isLoading && categoryList?.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <List className="w-8 h-8 text-neutral-400" />
                </div>
                <h3 className="text-neutral-900 font-bold mb-1">Chưa có danh mục nào</h3>
                <p className="text-sm text-neutral-500 mb-4">Bắt đầu bằng cách tạo danh mục sản phẩm đầu tiên của bạn.</p>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-black hover:bg-black/80 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm cursor-pointer"
                >
                  Thêm danh mục
                </button>
              </div>
            )}

          </div>

          {/* Pagination */}
          {!isLoading && categoryList?.length > 0 && (
            (function() {
              // Tính toán lại số trang
              const filteredCategories = categoryList?.filter(category => 
                category.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
              ) || [];
              const totalPages = Math.ceil(filteredCategories.length / itemsPerPage) || 1;
              const indexOfFirstItem = (currentPage - 1) * itemsPerPage + 1;
              const indexOfLastItem = Math.min(currentPage * itemsPerPage, filteredCategories.length);

              return (
                <div className="flex items-center justify-end mt-6 pt-6 border-t border-neutral-100">
                  <div className="flex gap-1">
                    <button 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 border border-neutral-200 rounded-md text-sm cursor-pointer transition-colors ${
                        currentPage === 1 
                        ? 'text-neutral-400 bg-neutral-50 cursor-not-allowed opacity-50' 
                        : 'text-neutral-600 hover:bg-neutral-50'
                      }`}
                    >
                      Trang trước
                    </button>
                    
                    {Array.from({ length: totalPages }).map((_, idx) => {
                      const pageNumber = idx + 1;
                      return (
                        <button 
                          key={pageNumber}
                          onClick={() => setCurrentPage(pageNumber)}
                          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                            currentPage === pageNumber
                              ? 'bg-black text-white'
                              : 'text-neutral-600 hover:bg-neutral-50 border border-transparent hover:border-neutral-200'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}

                    <button 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 border border-neutral-200 rounded-md text-sm cursor-pointer transition-colors ${
                        currentPage === totalPages 
                        ? 'text-neutral-400 bg-neutral-50 cursor-not-allowed opacity-50' 
                        : 'text-neutral-600 hover:bg-neutral-50'
                      }`}
                    >
                      Trang sau
                    </button>
                  </div>
                </div>
              );
            })()
          )}

        </div>
      </main>

      {/* -------------------- MODALS -------------------- */}

      {/* Add Category Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
              <h3 className="text-lg font-bold text-neutral-900">Thêm danh mục mới</h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                type="button"
              >
                <X className="w-5 h-5 cursor-pointer" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleAddNew}>
              <div className="p-6 space-y-5">
                
                {/* Tên danh mục */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                    Tên danh mục <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="VD: Phòng khách, Sofa..."
                    className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  />
                </div>

                {/* Danh mục cha */}
                <div>
                  <label htmlFor="parent_id" className="block text-sm font-medium text-neutral-700 mb-1">
                    Danh mục cha
                  </label>
                  <select
                    id="parent_id"
                    className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm bg-white cursor-pointer"
                    value={newCategory.parent_id}
                    onChange={(e) => setNewCategory({ ...newCategory, parent_id: e.target.value })}
                  >
                    <option value="">-- Mục gốc (Không có cha) --</option>
                    {categoryList?.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                {/* Mô tả */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1">
                    Mô tả ngắn
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    placeholder="Mô tả về danh mục này..."
                    className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm resize-none"
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Trạng thái */}
                  <div>
                    <label htmlFor="is_active" className="block text-sm font-medium text-neutral-700 mb-1">
                      Trạng thái
                    </label>
                    <select
                      id="is_active"
                      className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm bg-white cursor-pointer"
                      value={newCategory.is_active}
                      onChange={(e) => setNewCategory({ ...newCategory, is_active: Number(e.target.value) })}
                    >
                      <option value={1}>Hoạt động</option>
                      <option value={0}>Ẩn</option>
                    </select>
                  </div>

                  {/* Thứ tự */}
                  <div>
                    <label htmlFor="sort_order" className="block text-sm font-medium text-neutral-700 mb-1">
                      Thứ tự hiển thị
                    </label>
                    <input
                      type="number"
                      id="sort_order"
                      min="0"
                      className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                      value={newCategory.sort_order}
                      onChange={(e) => setNewCategory({ ...newCategory, sort_order: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-neutral-100 bg-neutral-50 flex items-center justify-end gap-3 rounded-b-2xl">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 bg-white border border-neutral-200 hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-black/80 rounded-lg transition-colors shadow-sm cursor-pointer"
                >
                  Lưu danh mục
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
              <h3 className="text-lg font-bold text-neutral-900">Sửa danh mục</h3>
              <button 
                onClick={() => setIsEditModalOpen(false)}
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

                {/* Danh mục cha (bỏ qua chính nó trong danh sách) */}
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
                    {categoryList?.filter(cat => cat.id !== selectedCategoryId).map(cat => (
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
                  onClick={() => setIsEditModalOpen(false)}
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
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
              <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Xác nhận xóa
              </h3>
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
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
                onClick={() => setIsDeleteModalOpen(false)}
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
      )}

    </>
  );
};
