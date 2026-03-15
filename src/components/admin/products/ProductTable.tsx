import React, { useState } from 'react';
import { Edit2, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import { TypeProduct } from '../pages/AdminProducts';
import { useNavigate } from 'react-router-dom';

interface ProductTableProps {
  products: TypeProduct[];
}

export const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  const navigate = useNavigate();
  // State quản lý xem hàng nào đang được mở rộng (Expand)
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  // Hàm bật/tắt mở rộng dòng
  const toggleRow = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-neutral-100 bg-neutral-50/50">
            {/* Cột Expand Arrow */}
            <th className="pb-3 pt-3 px-2 w-8"></th>
            {/* Cột Checkbox chọn nhiều */}
            <th className="pb-3 pt-3 px-2 w-8">
              <input
                type="checkbox"
                className="rounded border-neutral-300 text-black focus:ring-black cursor-pointer w-4 h-4 shadow-sm"
              />
            </th>
            <th className="pb-3 pt-3 px-4 text-xs font-bold uppercase tracking-widest text-neutral-500">Sản phẩm</th>
            <th className="pb-3 pt-3 px-4 text-xs font-bold uppercase tracking-widest text-neutral-500">Mã SKU</th>
            <th className="pb-3 pt-3 px-4 text-xs font-bold uppercase tracking-widest text-neutral-500">Danh mục</th>
            <th className="pb-3 pt-3 px-4 text-xs font-bold uppercase tracking-widest text-neutral-500 text-right">Giá bán</th>
            <th className="pb-3 pt-3 px-4 text-xs font-bold uppercase tracking-widest text-neutral-500 text-center">Tồn kho</th>
            <th className="pb-3 pt-3 px-4 text-xs font-bold uppercase tracking-widest text-neutral-500 text-center">Trạng thái</th>
            <th className="pb-3 pt-3 px-4 text-xs font-bold uppercase tracking-widest text-neutral-500 text-right rounded-tr-lg">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => {
            // 1. Tính tổng tồn kho từ các biến thể cho TỪNG sản phẩm
            const totalStock = product.variants 
              ? product.variants.reduce((sum, v) => sum + v.stock_quantity, 0) 
              : 0;
            
            const isExpanded = expandedRows.includes(product.id);

            return (
              <React.Fragment key={product.id}>
                {/* Dòng Sản phẩm chính */}
                <tr className={`border-b border-neutral-50 hover:bg-neutral-50/40 transition-colors ${isExpanded ? 'bg-neutral-50/30' : ''}`}>
                  {/* Nút Arrow Mở rộng */}
                  <td className="py-4 px-2 text-center">
                    {product.variants && product.variants.length > 0 && (
                      <button 
                        onClick={() => toggleRow(product.id)} 
                        className="p-1 hover:bg-neutral-100 rounded-md transition-colors cursor-pointer text-neutral-500"
                      >
                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </button>
                    )}
                  </td>
                  {/* Checkbox item */}
                  <td className="py-4 px-2">
                    <input
                      type="checkbox"
                      className="rounded border-neutral-300 text-black focus:ring-black cursor-pointer w-4 h-4 shadow-sm"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={
                          product.image_url 
                            ? (product.image_url.startsWith('http') 
                                ? product.image_url 
                                : `http://127.0.0.1:8000/storage/${product.image_url}`) 
                            : 'https://placehold.co/50x50'
                        } 
                        alt={product.name} 
                        className="w-12 h-12 rounded-lg object-cover border border-neutral-100" 
                      />
                      <div>
                        <span className="text-sm font-bold text-neutral-900 block truncate max-w-[220px]">{product.name}</span>
                        <span className="text-xs text-neutral-400">ID: #{product.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm font-medium text-neutral-500">{product.sku}</td>
                  <td className="py-4 px-4 text-sm text-neutral-600">
                    <span className="bg-neutral-100 px-2.5 py-1 rounded-md text-xs font-semibold text-neutral-700">
                      {product.category.name} {/* 👈 Sửa lỗi render Object */}
                    </span>
                  </td>

                  {/* Cột Giá có khuyến mãi */}
                  <td className="py-4 px-4 text-right">
                    {product.sale_price ? (
                      <div>
                        <div className="text-sm font-bold text-red-600">
                          {Number(product.sale_price).toLocaleString('vi-VN')} đ
                        </div>
                        <div className="text-xs text-neutral-400 line-through">
                          {Number(product.base_price).toLocaleString('vi-VN')} đ
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm font-bold text-neutral-900">
                        {Number(product.base_price).toLocaleString('vi-VN')} đ
                      </div>
                    )}
                  </td>

                  {/* Cột Tồn kho - sử dụng totalStock tổng */}
                  <td className="py-4 px-4 text-center text-sm font-semibold">
                    <span className={`
                      ${totalStock === 0 ? 'text-red-500' : ''}
                      ${totalStock > 0 && totalStock <= 5 ? 'text-amber-500' : 'text-neutral-700'}
                    `}>
                      {totalStock === 0 ? 'Hết hàng' : totalStock}
                    </span>
                  </td>

                  {/* Cột Trạng thái boolean */}
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border
                      ${product.is_active
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : 'bg-neutral-100 text-neutral-600 border-neutral-200'
                      }`}
                    >
                      {product.is_active ? 'Đang bán' : 'Ẩn / Khóa'}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                        className="p-1.5 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        title="Chỉnh sửa Chi Tiết"
                      >
                        <Edit2 className="w-4 h-4 cursor-pointer" />
                      </button>
                      <button
                        className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4 cursor-pointer" />
                      </button>
                    </div>
                  </td>
                </tr>

                {/* 🔽 Dòng Con hiển thị Biến thể (Variants) khi được Expand */}
                {isExpanded && product.variants && product.variants.length > 0 && (
                  <tr className="bg-neutral-50/30 border-b border-neutral-50">
                    <td colSpan={9} className="py-3 px-8">
                      <div className="bg-white rounded-xl border border-neutral-100 p-4 shadow-sm">
                        <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3">Danh sách biến thể ({product.variants.length})</h4>
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-neutral-100 text-xs text-neutral-400 font-semibold">
                              <th className="pb-2 px-3">Màu sắc</th>
                              <th className="pb-2 px-3">Kích thước</th>
                              <th className="pb-2 px-3">SKU Biến thể</th>
                              <th className="pb-2 px-3 text-right">Giá biến thể</th>
                              <th className="pb-2 px-3 text-center">Tồn kho</th>
                            </tr>
                          </thead>
                          <tbody>
                            {product.variants.map((v) => (
                              <tr key={v.id} className="border-b border-neutral-50 last:border-0 hover:bg-neutral-50/40 text-sm">
                                <td className="py-2.5 px-3 font-medium text-neutral-800">{v.color || 'Mặc định'}</td>
                                <td className="py-2.5 px-3 text-neutral-500">{v.size || 'N/A'}</td>
                                <td className="py-2.5 px-3 font-mono text-xs text-neutral-400">{v.sku}</td>
                                <td className="py-2.5 px-3 text-right font-bold text-neutral-900">{Number(v.price).toLocaleString('vi-VN')} đ</td>
                                <td className="py-2.5 px-3 text-center">
                                  <span className={`text-xs font-bold ${v.stock_quantity === 0 ? 'text-red-500' : 'text-neutral-600'}`}>
                                    {v.stock_quantity === 0 ? 'Hết' : v.stock_quantity}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
