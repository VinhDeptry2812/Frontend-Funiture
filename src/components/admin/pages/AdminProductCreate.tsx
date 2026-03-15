import React, { useState, useEffect } from 'react';
import { AdminHeader } from '../layout/AdminHeader';
import { ArrowLeft, Save, Upload, Image as ImageIcon, Plus, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { productService } from '@/src/Service/productService';
import { Toast, ToastType } from '@/src/components/Toast';
import { AnimatePresence } from 'motion/react';

interface VariantInput {
  color: string;
  size: string;
  sku: string;
  price: string;
  stock_quantity: string;
  // Bổ sung các trường chuyên sâu cho nội thất
  wood_type?: string;
  upholstery?: string;
  finish?: string;
  width_cm?: string;
  depth_cm?: string;
  height_cm?: string;
  weight_kg?: string;
  seat_height_cm?: string;
  image: File | null;
  imagePreview: string;
}

export const AdminProductCreate: React.FC = () => {
  const navigate = useNavigate();

  // 1. State cho Thông tin chính sản phẩm
  const [inputs, setInputs] = useState({
    name: '',
    description: '',
    base_price: '',
    sale_price: '',
    sku: '',
    stock_quantity: '', 
    category_id: '',
    is_active: '1',
  });

  const [categories, setCategories] = useState<any[]>([]);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // 2. State cho các Biến thể (Variants)
  const [variants, setVariants] = useState<VariantInput[]>([]);

  // 3. State cho Toast
  const [toasts, setToasts] = useState<{ id: string; message: string; type: ToastType }[]>([]);

  const addToast = (message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // 3. Gọi API lấy Danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await productService.getCategories();
        setCategories(res); 
      } catch (error) {
        console.error("Lỗi lấy danh mục:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMainImage(file);
      setMainImagePreview(URL.createObjectURL(file));
    }
  };

  // --- Logic quản lý Biến thể ---
  const handleAddVariant = () => {
    setVariants([...variants, { 
      color: '', size: '', sku: '', price: '', stock_quantity: '', 
      wood_type: '', upholstery: '', finish: '', 
      width_cm: '', depth_cm: '', height_cm: '', 
      weight_kg: '', seat_height_cm: '',
      image: null, imagePreview: '' 
    }]);
  };

  const handleVariantChange = (index: number, field: keyof VariantInput, value: any) => {
    const updated = [...variants];
    updated[index] = { ...updated[index], [field]: value };
    setVariants(updated);
  };

  const handleVariantImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const updated = [...variants];
      updated[index].image = file;
      updated[index].imagePreview = URL.createObjectURL(file);
      setVariants(updated);
    }
  };

  const handleRemoveVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  // --- Submit form ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputs.name || !inputs.base_price || !inputs.category_id) {
      addToast("Vui lòng điền đầy đủ các trường bắt buộc (*)", 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      // B1: Pack dữ liệu sản phẩm chính
      const form = new FormData();
      form.append('name', inputs.name);
      form.append('description', inputs.description);
      form.append('base_price', inputs.base_price);
      if (inputs.sale_price) form.append('sale_price', inputs.sale_price);
      form.append('sku', inputs.sku);
      form.append('category_id', inputs.category_id);
      form.append('is_active', inputs.is_active);
      if (mainImage) form.append('image', mainImage);

      // B2: Gọi API Tạo sản phẩm chính
      const productRes = await productService.createProduct(form);
      const newProductId = productRes.product?.id || productRes.data?.id;

      if (!newProductId) throw new Error("Không lấy được ID sản phẩm sau khi tạo.");

      // B3: Vòng lặp bắn các Biến thể (nếu có) lên Backend
      for (const v of variants) {
        if (!v.sku || !v.price) continue; 

        const variantForm = new FormData();
        variantForm.append('sku', v.sku);
        variantForm.append('price', v.price);
        variantForm.append('stock_quantity', v.stock_quantity || '0');
        if (v.color) variantForm.append('color', v.color);
        if (v.size) variantForm.append('size', v.size);
        
        // 🔥 Bổ sung các trường chuyên sâu cho nội thất
        if (v.wood_type) variantForm.append('wood_type', v.wood_type);
        if (v.upholstery) variantForm.append('upholstery', v.upholstery);
        if (v.finish) variantForm.append('finish', v.finish);
        if (v.width_cm) variantForm.append('width_cm', v.width_cm);
        if (v.depth_cm) variantForm.append('depth_cm', v.depth_cm);
        if (v.height_cm) variantForm.append('height_cm', v.height_cm);
        if (v.weight_kg) variantForm.append('weight_kg', v.weight_kg);
        if (v.seat_height_cm) variantForm.append('seat_height_cm', v.seat_height_cm);

        variantForm.append('is_available', '1');
        if (v.image) variantForm.append('image', v.image);

        await productService.createVariant(newProductId, variantForm);
      }

      addToast("🎉 Thêm sản phẩm thành công!", "success");
      // Delay điều hướng để người dùng nhìn thấy Toast
      setTimeout(() => {
        navigate('/admin/products');
      }, 1500);

    } catch (error: any) {
      console.error("Lỗi tạo sản phẩm:", error);
      
      let errorMsg = "Đã xảy ra lỗi khi tạo sản phẩm.";
      if (error.response && error.response.data) {
        const data = error.response.data;
        if (data.errors) {
          const errorList = Object.values(data.errors).flat();
          errorMsg = `Điền thiếu hoặc sai thông tin:\n- ${errorList.join('\n- ')}`;
        } else if (data.message) {
          errorMsg = `Lỗi hệ thống: ${data.message}`;
        }
      } else if (error.message) {
        errorMsg = `Lỗi kết nối: ${error.message}`;
      }

      addToast(errorMsg, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AdminHeader title="Thêm sản phẩm mới" />

      <main className="flex-1 p-8 overflow-y-auto bg-neutral-50 relative">
        <form className="max-w-5xl mx-auto space-y-6" onSubmit={handleSubmit}>
          
          {/* Header Bar */}
          <div className="flex items-center justify-between mb-2">
            <button 
              type="button" 
              onClick={() => navigate('/admin/products')}
              className="flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại danh sách
            </button>
            <div className="flex items-center gap-3">
              <button 
                type="button"
                onClick={() => navigate('/admin/products')}
                className="px-4 py-2 text-sm font-medium text-neutral-600 bg-white border border-neutral-200 hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-black hover:bg-black/80 rounded-lg transition-colors shadow-sm cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {isSubmitting ? 'Đang lưu...' : 'Lưu sản phẩm'}
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
                      name="name"
                      value={inputs.name}
                      onChange={handleChange}
                      type="text"
                      placeholder="VD: Sofa Vải Nỉ Phong Cách Bắc Âu"
                      className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Mô tả chi tiết
                    </label>
                    <textarea
                      name="description"
                      value={inputs.description}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Nhập mô tả chi tiết cho sản phẩm..."
                      className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm resize-y"
                    />
                  </div>
                </div>
              </div>

              {/* Box 2: Giá cả và Kho hàng */}
              <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-neutral-100 p-6">
                <h3 className="text-base font-bold text-neutral-900 mb-5">Giá cả & Kho hàng (Sản phẩm chính)</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Giá bán gốc (VNĐ) <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="base_price"
                      value={inputs.base_price}
                      onChange={handleChange}
                      type="number"
                      placeholder="0"
                      className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Giá khuyến mãi (VNĐ)
                    </label>
                    <input
                      name="sale_price"
                      value={inputs.sale_price}
                      onChange={handleChange}
                      type="number"
                      placeholder="0"
                      className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Mã SKU
                    </label>
                    <input
                      name="sku"
                      value={inputs.sku}
                      onChange={handleChange}
                      type="text"
                      placeholder="VD: SP-001"
                      className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                    />
                  </div>

                  {variants.length === 0 && (
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Số lượng kho
                      </label>
                      <input
                        name="stock_quantity"
                        value={inputs.stock_quantity}
                        onChange={handleChange}
                        type="number"
                        placeholder="0"
                        className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Box Bổ sung: QUẢN LÝ BIẾN THỂ */}
              <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-neutral-100 p-6">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-base font-bold text-neutral-900">Biến thể Sản phẩm</h3>
                  <button 
                    type="button"
                    onClick={handleAddVariant}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg text-xs font-bold transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Thêm biến thể
                  </button>
                </div>

                {variants.length === 0 ? (
                  <p className="text-sm text-neutral-400 text-center py-4">Sản phẩm này hiện không có biến thể đơn lẻ.</p>
                ) : (
                  <div className="space-y-4">
                    {variants.map((v, index) => (
                      <div key={index} className="border border-neutral-100 rounded-xl p-4 bg-neutral-50/50">
                        
                        {/* Header của Biến thể */}
                        <div className="flex justify-between items-center mb-3 pb-2 border-b border-neutral-200/50">
                          <span className="text-xs font-bold text-neutral-500">Biến thể #{index + 1}</span>
                          <button 
                            type="button" 
                            onClick={() => handleRemoveVariant(index)}
                            className="text-red-500 hover:bg-red-50 hover:text-red-600 p-1.5 rounded-lg border border-neutral-200 bg-white shadow-sm transition-all cursor-pointer"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="space-y-3">
                          
                          {/* Hàng 1: Cơ bản */}
                          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                            <div>
                              <label className="block text-xs font-bold text-neutral-600 mb-1">Mã SKU *</label>
                              <input 
                                type="text" value={v.sku} onChange={(e) => handleVariantChange(index, 'sku', e.target.value)}
                                placeholder="SKU" className="w-full px-3 py-1.5 border border-neutral-200 rounded-lg text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-neutral-600 mb-1">Giá biến thể *</label>
                              <input 
                                type="number" value={v.price} onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                                placeholder="Giá" className="w-full px-3 py-1.5 border border-neutral-200 rounded-lg text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-neutral-600 mb-1">Tồn kho</label>
                              <input 
                                type="number" value={v.stock_quantity} onChange={(e) => handleVariantChange(index, 'stock_quantity', e.target.value)}
                                placeholder="Kho" className="w-full px-3 py-1.5 border border-neutral-200 rounded-lg text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-neutral-600 mb-1">Màu sắc</label>
                              <input 
                                type="text" value={v.color} onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
                                placeholder="VD: Nâu" className="w-full px-3 py-1.5 border border-neutral-200 rounded-lg text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-neutral-600 mb-1">Kích cỡ tổng quát</label>
                              <input 
                                type="text" value={v.size} onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                                placeholder="VD: 2.8m x 1.7m" className="w-full px-3 py-1.5 border border-neutral-200 rounded-lg text-xs"
                              />
                            </div>
                          </div>

                          {/* Hàng 2: Thuộc tính Nội thất (Gỗ, Nỉ, Hoàn thiện, Nặng) */}
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-white p-2.5 rounded-lg border border-neutral-100">
                            <div>
                              <label className="block text-xs font-medium text-neutral-500 mb-1">Loại gỗ</label>
                              <input 
                                type="text" value={v.wood_type} onChange={(e) => handleVariantChange(index, 'wood_type', e.target.value)}
                                placeholder="VD: Gỗ Sồi" className="w-full px-3 py-1.5 border border-neutral-200 rounded-lg text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-neutral-500 mb-1">Vải bọc / Da</label>
                              <input 
                                type="text" value={v.upholstery} onChange={(e) => handleVariantChange(index, 'upholstery', e.target.value)}
                                placeholder="VD: Da bò thật" className="w-full px-3 py-1.5 border border-neutral-200 rounded-lg text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-neutral-500 mb-1">Hoàn thiện bề mặt</label>
                              <input 
                                type="text" value={v.finish} onChange={(e) => handleVariantChange(index, 'finish', e.target.value)}
                                placeholder="VD: Walnut" className="w-full px-3 py-1.5 border border-neutral-200 rounded-lg text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-neutral-500 mb-1">Trọng lượng (kg)</label>
                              <input 
                                type="number" step="0.1" value={v.weight_kg} onChange={(e) => handleVariantChange(index, 'weight_kg', e.target.value)}
                                placeholder="0.0" className="w-full px-3 py-1.5 border border-neutral-200 rounded-lg text-xs"
                              />
                            </div>
                          </div>

                          {/* Hàng 3: Kích thước Số lượng CM */}
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-neutral-100/30 p-2.5 rounded-lg">
                            <div>
                              <label className="block text-xs font-medium text-neutral-500 mb-1">Dài (width_cm)</label>
                              <input 
                                type="number" value={v.width_cm} onChange={(e) => handleVariantChange(index, 'width_cm', e.target.value)}
                                placeholder="cm" className="w-full px-3 py-1.5 border border-neutral-200 rounded-lg text-xs bg-white"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-neutral-500 mb-1">Rộng (depth_cm)</label>
                              <input 
                                type="number" value={v.depth_cm} onChange={(e) => handleVariantChange(index, 'depth_cm', e.target.value)}
                                placeholder="cm" className="w-full px-3 py-1.5 border border-neutral-200 rounded-lg text-xs bg-white"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-neutral-500 mb-1">Cao (height_cm)</label>
                              <input 
                                type="number" value={v.height_cm} onChange={(e) => handleVariantChange(index, 'height_cm', e.target.value)}
                                placeholder="cm" className="w-full px-3 py-1.5 border border-neutral-200 rounded-lg text-xs bg-white"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-neutral-500 mb-1">Cao ghế (seat_height_cm)</label>
                              <input 
                                type="text" value={v.seat_height_cm} onChange={(e) => handleVariantChange(index, 'seat_height_cm', e.target.value)}
                                placeholder="VD: 45cm" className="w-full px-3 py-1.5 border border-neutral-200 rounded-lg text-xs bg-white"
                              />
                            </div>
                          </div>

                        </div>

                        {/* Chọn ảnh biến thể */}
                        <div className="mt-3 flex items-center gap-3">
                          <label className="flex items-center gap-1.5 cursor-pointer bg-white px-3 py-1.5 border border-neutral-200 rounded-lg text-xs font-medium text-neutral-600 hover:bg-neutral-50 shadow-sm">
                            <Upload className="w-3.5 h-3.5" /> Ảnh riêng
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleVariantImageChange(index, e)} />
                          </label>
                          {v.imagePreview && (
                            <img src={v.imagePreview} alt="Preview" className="w-7 h-7 rounded-md object-cover border border-neutral-100" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Cột phải: Phân loại & Hình ảnh */}
            <div className="space-y-6">

              {/* Box 3: Hình ảnh chính */}
              <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-neutral-100 p-6">
                <h3 className="text-base font-bold text-neutral-900 mb-5">Hình ảnh sản phẩm *</h3>
                
                <div className="border-2 border-dashed border-neutral-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-blue-500 hover:bg-blue-50/50 transition-colors cursor-pointer group relative">
                  {mainImagePreview ? (
                    <div className="relative w-full aspect-square bg-neutral-50 rounded-lg overflow-hidden border border-neutral-100">
                      <img src={mainImagePreview} alt="Main Preview" className="w-full h-full object-cover" />
                      <button 
                        type="button" 
                        onClick={() => { setMainImage(null); setMainImagePreview(''); }}
                        className="absolute right-2 top-2 bg-black/60 text-white p-1 rounded-full hover:bg-black/80"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-neutral-100 text-neutral-500 rounded-full flex items-center justify-center mb-3 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                        <Upload className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-medium text-neutral-900">Click để chọn ảnh chính</p>
                      <label className="px-4 py-2 mt-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-xs font-medium transition-colors cursor-pointer">
                        Chọn ảnh
                        <input type="file" className="hidden" accept="image/*" onChange={handleMainImageChange} />
                      </label>
                    </>
                  )}
                </div>
              </div>

              {/* Box 4: Phân loại */}
              <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-neutral-100 p-6">
                <h3 className="text-base font-bold text-neutral-900 mb-5">Phân loại</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Danh mục <span className="text-red-500">*</span>
                    </label>
                    <select 
                      name="category_id"
                      value={inputs.category_id}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm bg-white cursor-pointer"
                    >
                      <option value="">-- Chọn danh mục --</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Trạng thái
                    </label>
                    <select 
                      name="is_active"
                      value={inputs.is_active}
                      onChange={handleChange}
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

      {/* Render Toast Danh sách */}
      <div className="fixed top-5 right-5 z-50 flex flex-col items-end pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <Toast 
              key={t.id} 
              id={t.id} 
              message={t.message} 
              type={t.type} 
              onClose={removeToast} 
            />
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};
