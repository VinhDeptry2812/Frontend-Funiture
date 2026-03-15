import React from 'react';
import { AdminHeader } from '../layout/AdminHeader';
import { ArrowLeft, Save, Upload, Image as ImageIcon } from 'lucide-react';

export const AdminProductEdit: React.FC = () => {
  return (
    <>
      <AdminHeader title="Chỉnh sửa sản phẩm" />

      <main className="flex-1 p-8 overflow-y-auto bg-neutral-50 relative">
        <form className="max-w-5xl mx-auto space-y-6" onSubmit={(e) => e.preventDefault()}>
          
          {/* Header Bar */}
          <div className="flex items-center justify-between mb-2">
            <button 
              type="button" 
              className="flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại danh sách
            </button>
            <div className="flex items-center gap-3">
              <button 
                type="button"
                className="px-4 py-2 text-sm font-medium text-neutral-600 bg-white border border-neutral-200 hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button 
                type="submit"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                <Save className="w-4 h-4" />
                Cập nhật thông tin
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Cột trái: Thông tin chính */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Box 1: Thông tin cơ bản */}
              <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-neutral-100 p-6">
                <h3 className="text-base font-bold text-neutral-900 mb-5">Thông tin cơ bản</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Tên sản phẩm <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue="Sofa Da Cao Cấp"
                      className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Mô tả chi tiết
                    </label>
                    <textarea
                      rows={6}
                      defaultValue="Mô tả chi tiết về sản phẩm..."
                      className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm resize-y"
                    />
                  </div>
                </div>
              </div>

              {/* Box 2: Giá cả và Kho hàng */}
              <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-neutral-100 p-6">
                <h3 className="text-base font-bold text-neutral-900 mb-5">Giá cả & Kho hàng</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Giá bán (VNĐ) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      defaultValue="15000000"
                      className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Giá so sánh (Khuyến mãi)
                    </label>
                    <input
                      type="number"
                      defaultValue="18000000"
                      className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Mã SKU
                    </label>
                    <input
                      type="text"
                      defaultValue="SF-001"
                      className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Số lượng kho
                    </label>
                    <input
                      type="number"
                      defaultValue="15"
                      className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Cột phải: Phân loại & Hình ảnh */}
            <div className="space-y-6">

              {/* Box 3: Hình ảnh */}
              <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-neutral-100 p-6">
                <h3 className="text-base font-bold text-neutral-900 mb-5">Hình ảnh sản phẩm</h3>
                
                <div className="border-2 border-dashed border-neutral-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-blue-500 hover:bg-blue-50/50 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-neutral-100 text-neutral-500 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-neutral-900">Kéo thả ảnh vào đây</p>
                  <p className="text-xs text-neutral-500 mt-1 mb-4">Hoặc click để chọn file</p>
                  <label className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-sm font-medium transition-colors cursor-pointer">
                    Chọn ảnh
                    <input type="file" className="hidden" multiple accept="image/*" />
                  </label>
                </div>
                
                {/* Khu vực preview ảnh mồi (bạn sẽ tự implement logic preview khi upload) */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="aspect-square bg-neutral-100 rounded-lg border border-neutral-200 flex items-center justify-center text-neutral-400 overflow-hidden">
                     {/* Giả lập ảnh có sẵn */}
                     <img src="https://via.placeholder.com/150" alt="preview" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              {/* Box 4: Phân loại */}
              <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-neutral-100 p-6">
                <h3 className="text-base font-bold text-neutral-900 mb-5">Phân loại</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Danh mục
                    </label>
                    <select 
                      defaultValue="1"
                      className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm bg-white cursor-pointer"
                    >
                      <option value="">-- Chọn danh mục --</option>
                      <option value="1">Sofa</option>
                      <option value="2">Bàn ghế</option>
                      <option value="3">Tủ</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Trạng thái
                    </label>
                    <select 
                      defaultValue="1"
                      className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm bg-white cursor-pointer"
                    >
                      <option value="1">Đang bán (Hiển thị)</option>
                      <option value="0">Ẩn khỏi cửa hàng</option>
                    </select>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </form>
      </main>
    </>
  );
};
