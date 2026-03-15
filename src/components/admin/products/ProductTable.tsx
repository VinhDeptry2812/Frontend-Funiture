import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

// Dùng dữ liệu giả (mock data) cho UI vì người dùng sẽ tự viết logic API
const mockProducts = [
  { id: 1, name: 'Sofa Da Cao Cấp', sku: 'SF-001', price: 15000000, category: 'Sofa', status: 1, image: 'https://via.placeholder.com/50' },
  { id: 2, name: 'Bàn Ăn Gỗ Sồi', sku: 'BA-002', price: 8500000, category: 'Bàn Ăn', status: 1, image: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Tủ Quần Áo Bắc Âu', sku: 'TQA-003', price: 12000000, category: 'Tủ Quần Áo', status: 0, image: 'https://via.placeholder.com/50' },
];

export const ProductTable: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-neutral-100 bg-neutral-50/50">
            <th className="pb-3 pt-3 px-4 text-xs font-bold uppercase tracking-widest text-neutral-500 rounded-tl-lg">Sản phẩm</th>
            <th className="pb-3 pt-3 px-4 text-xs font-bold uppercase tracking-widest text-neutral-500">Mã SKU</th>
            <th className="pb-3 pt-3 px-4 text-xs font-bold uppercase tracking-widest text-neutral-500">Danh mục</th>
            <th className="pb-3 pt-3 px-4 text-xs font-bold uppercase tracking-widest text-neutral-500 text-right">Giá bán</th>
            <th className="pb-3 pt-3 px-4 text-xs font-bold uppercase tracking-widest text-neutral-500 text-center">Trạng thái</th>
            <th className="pb-3 pt-3 px-4 text-xs font-bold uppercase tracking-widest text-neutral-500 text-right rounded-tr-lg">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {mockProducts.map((product) => (
            <tr key={product.id} className="border-b border-neutral-50 last:border-0 hover:bg-neutral-50/50 transition-colors">
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover border border-neutral-200" />
                  <div>
                    <span className="text-sm font-bold text-neutral-900 block">{product.name}</span>
                    <span className="text-xs text-neutral-500">#{product.id}</span>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4 text-sm font-medium text-neutral-500">{product.sku}</td>
              <td className="py-4 px-4 text-sm text-neutral-600">
                <span className="bg-neutral-100 px-2.5 py-1 rounded-md text-xs font-semibold">
                  {product.category}
                </span>
              </td>
              <td className="py-4 px-4 text-sm font-bold text-neutral-900 text-right">
                {product.price.toLocaleString('vi-VN')} đ
              </td>
              <td className="py-4 px-4 text-center">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border
                  ${product.status === 1
                    ? 'bg-green-50 text-green-700 border-green-200'
                    : 'bg-neutral-100 text-neutral-600 border-neutral-200'
                  }`}
                >
                  {product.status === 1 ? 'Đang bán' : 'Hết hàng/Ẩn'}
                </span>
              </td>
              <td className="py-4 px-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                    title="Chỉnh sửa (Chuyển trang)"
                  >
                    <Edit2 className="w-4 h-4 cursor-pointer" />
                  </button>
                  <button
                    className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Xóa"
                  >
                    <Trash2 className="w-4 h-4 cursor-pointer" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
