import React, { useState, useEffect } from 'react';
import { AdminHeader } from '../layout/AdminHeader';
import { Plus, Search } from 'lucide-react';
import categoryService from '../../../Service/categoryService';
import { useToast } from '../../../contexts/ToastContext';

import { CategoryTable } from '../categories/CategoryTable';
import { CategoryPagination } from '../categories/CategoryPagination';
import { AddCategoryModal } from '../categories/AddCategoryModal';
import { EditCategoryModal } from '../categories/EditCategoryModal';
import { DeleteCategoryModal } from '../categories/DeleteCategoryModal';

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
  const [categoryToEdit, setCategoryToEdit] = useState<any>(null);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState<number | null>(null);

  const fetchCategory = async () => {
    setIsLoading(true);
    try {
      const response = await categoryService.getCategory();
      setCategoryList(response);
    } catch (error) {
      console.error("Lỗi lấy dữ liệu danh mục", error);
      showToast("Lỗi khi tải danh sách danh mục!", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleEditClick = (category: any) => {
    setCategoryToEdit(category);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    setCategoryIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // Lọc và phân trang
  const filteredCategories = categoryList?.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);

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

          <CategoryTable
            isLoading={isLoading}
            currentItems={currentItems}
            searchTerm={searchTerm}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            onAddClick={() => setIsAddModalOpen(true)}
            hasCategories={categoryList.length > 0}
          />

          {!isLoading && categoryList.length > 0 && (
            <CategoryPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}

        </div>
      </main>

      <AddCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={fetchCategory}
        categoryList={categoryList}
      />

      <EditCategoryModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={fetchCategory}
        categoryList={categoryList}
        categoryToEdit={categoryToEdit}
      />

      <DeleteCategoryModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onSuccess={fetchCategory}
        categoryIdToDelete={categoryIdToDelete}
      />
    </>
  );
};
