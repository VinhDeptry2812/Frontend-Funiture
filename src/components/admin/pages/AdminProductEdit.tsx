import React, { useState, useEffect } from 'react';
import { AdminHeader } from '../layout/AdminHeader';
import { ArrowLeft, Save, Upload, Plus, Trash, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { productService } from '@/src/Service/productService';
import { Toast, ToastType } from '@/src/components/Toast';
import { AnimatePresence } from 'motion/react';

interface VariantInput {
  id?: number; // Cần ID để phân biệt biến thể cũ
  color: string;
  size: string;
  sku: string;
  price: string;
  stock_quantity: string;
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

export const AdminProductEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
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
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true); // 👈 Loading ban đầu

  // 2. State cho các Biến thể 
  const [variants, setVariants] = useState<VariantInput[]>([]);
  const [deletedVariantIds, setDeletedVariantIds] = useState<number[]>([]);

  // 3. State cho Toast
  const [toasts, setToasts] = useState<{ id: string; message: string; type: ToastType }[]>([]);

  const addToast = (message: string, type: ToastType) => {
    const toastId = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id: toastId, message, type }]);
  };

  const removeToast = (toastId: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== toastId));
  };

  // 4. Gọi API lấy Danh mục và Thông tin sản phẩm cũ
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy danh mục
        const catRes = await productService.getCategories();
        setCategories(catRes);

        if (!id) return;

        // Lấy chi tiết sản phẩm
        const productRes = await productService.getProductById(id);
        const productData = productRes.data; // 👈 Chỉ định bóc tách data

        setInputs({
          name: productData.name || '',
          description: productData.description || '',
          base_price: productData.base_price ? productData.base_price.toString() : '',
          sale_price: productData.sale_price ? productData.sale_price.toString() : '',
          sku: productData.sku || '',
          stock_quantity: productData.stock_quantity ? productData.stock_quantity.toString() : '',
          category_id: productData.category_id ? productData.category_id.toString() : '',
          is_active: productData.is_active ? '1' : '0',
        });
        
        if (productData.image_url) {
          const baseUrl = (import.meta as any).env.VITE_API_BASE_URL || 'http://localhost:8000';
          const imgUrl = productData.image_url.startsWith('http') 
            ? productData.image_url 
            : `${baseUrl}/storage/${productData.image_url}`;
          setMainImagePreview(imgUrl);
        }

        // Lấy biến thể sản phẩm
        const variantsRes = await productService.getProductVariants(id);
        const variantsData = variantsRes.data; // 👈 Chỉ định bóc tách data

        if (Array.isArray(variantsData)) {
          const loadedVariants = variantsData.map((v: any) => {
            const baseUrl = (import.meta as any).env.VITE_API_BASE_URL || 'http://localhost:8000';
            const vImgUrl = v.image_url 
              ? (v.image_url.startsWith('http') ? v.image_url : `${baseUrl}/storage/${v.image_url}`) 
              : '';
              
            return {
              id: v.id,
              sku: v.sku || '',
              price: v.price ? v.price.toString() : '',
              stock_quantity: v.stock_quantity ? v.stock_quantity.toString() : '0',
              color: v.color || '',
              size: v.size || '',
              wood_type: v.wood_type || '',
              upholstery: v.upholstery || '',
              finish: v.finish || '',
              width_cm: v.width_cm ? v.width_cm.toString() : '',
              depth_cm: v.depth_cm ? v.depth_cm.toString() : '',
              height_cm: v.height_cm ? v.height_cm.toString() : '',
              weight_kg: v.weight_kg ? v.weight_kg.toString() : '',
              seat_height_cm: v.seat_height_cm || '',
              image: null,
              imagePreview: vImgUrl
            };
          });
          setVariants(loadedVariants);
        }

      } catch (error) {
        console.error("Lỗi tải dữ liệu sản phẩm:", error);
        addToast("⚠️ Không thể tải thông tin sản phẩm này.", "error");
      } finally {
        setIsInitialLoading(false); // 👈 Đóng loading
      }
    };
    fetchData();
  }, [id]);

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
    const v = variants[index];
    if (v.id) {
      setDeletedVariantIds([...deletedVariantIds, v.id]);
    }
    setVariants(variants.filter((_, i) => i !== index));
  };

  // --- Submit form (Update) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    
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
      if (mainImage) form.append('image', mainImage); // Chỉ đẩy ảnh lên nếu có ảnh mới

      // Gọi API Cập nhật sản phẩm chính
      await productService.updateProduct(id, form);

      // B2: Xử lý xóa biến thể (nếu có bấm Xóa các biến thể cũ)
      for (const vId of deletedVariantIds) {
        try {
          await productService.deleteVariant(id, vId);
        } catch (err) {
          console.warn("Lỗi xóa biến thể id", vId, err);
        }
      }

      // B3: Cập nhật hoặc Thêm mới biến thể
      for (const v of variants) {
        if (!v.sku || !v.price) continue; 

        const variantForm = new FormData();
        variantForm.append('sku', v.sku);
        variantForm.append('price', v.price);
        variantForm.append('stock_quantity', v.stock_quantity || '0');
        if (v.color) variantForm.append('color', v.color);
        if (v.size) variantForm.append('size', v.size);
        
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

        if (v.id) {
          // Biến thể cũ -> Bóc update
          await productService.updateVariant(id, v.id, variantForm);
        } else {
          // Biến thể mới -> Tạo mới
          await productService.createVariant(id, variantForm);
        }
      }

      addToast("🎉 Cập nhật sản phẩm thành công!", "success");
      setTimeout(() => {
        navigate('/admin/products');
      }, 1500);

    } catch (error: any) {
      console.error("Lỗi cập nhật sản phẩm:", error);
      
      let errorMsg = "⚠️ Đã xảy ra lỗi khi tạo sản phẩm.";
      if (error.response && error.response.data) {
        const data = error.response.data;
        if (data.errors) {
          const errorList = Object.values(data.errors).flat();
          errorMsg = `🚨 Điền thiếu hoặc sai thông tin:\n- ${errorList.join('\n- ')}`;
        } else if (data.message) {
          errorMsg = `⚠️ Lỗi hệ thống: ${data.message}`;
        }
      } else if (error.message) {
        errorMsg = `⚠️ Lỗi kết nối: ${error.message}`;
      }
      addToast(errorMsg, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isInitialLoading) {
    return (
      <>
        <AdminHeader title="Chỉnh sửa sản phẩm" />
        <main className="flex-1 p-8 bg-neutral-50 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* Header Skeleton */}
            <div className="flex justify-between items-center mb-2">
              <div className="h-4 w-36 bg-neutral-200 animate-pulse rounded-md"></div>
              <div className="flex gap-3">
                <div className="h-9 w-20 bg-neutral-200 animate-pulse rounded-lg"></div>
                <div className="h-9 w-36 bg-neutral-200 animate-pulse rounded-lg"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Cột trái: Thông tin chính */}
              <div className="lg:col-span-2 space-y-6">
                {/* Box 1: Thông tin cơ bản */}
                <div className="bg-white rounded-2xl p-6 border border-neutral-100 space-y-5">
                  <div className="h-5 w-40 bg-neutral-200 animate-pulse rounded-md"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-neutral-200 animate-pulse rounded"></div>
                    <div className="h-10 w-full bg-neutral-50 animate-pulse rounded-lg"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-neutral-200 animate-pulse rounded"></div>
                    <div className="h-32 w-full bg-neutral-50 animate-pulse rounded-lg"></div>
                  </div>
                </div>

                {/* Box 2: Giá cả & Kho hàng */}
                <div className="bg-white rounded-2xl p-6 border border-neutral-100 space-y-5">
                  <div className="h-5 w-44 bg-neutral-200 animate-pulse rounded-md"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-12 bg-neutral-50 animate-pulse rounded-lg"></div>
                    <div className="h-12 bg-neutral-50 animate-pulse rounded-lg"></div>
                    <div className="h-12 bg-neutral-50 animate-pulse rounded-lg"></div>
                    <div className="h-12 bg-neutral-50 animate-pulse rounded-lg"></div>
                  </div>
                </div>
              </div>

              {/* Cột phải: Hình ảnh & Phân loại */}
              <div className="space-y-6">
                {/* Box 3: Hình ảnh */}
                <div className="bg-white rounded-2xl p-6 border border-neutral-100 space-y-4">
                  <div className="h-5 w-36 bg-neutral-200 animate-pulse rounded-md"></div>
                  <div className="aspect-square w-full bg-neutral-50 animate-pulse rounded-xl border-2 border-dashed border-neutral-100"></div>
                </div>

                {/* Box 4: Danh mục */}
                <div className="bg-white rounded-2xl p-6 border border-neutral-100 space-y-4">
                  <div className="h-5 w-24 bg-neutral-200 animate-pulse rounded-md"></div>
                  <div className="h-10 w-full bg-neutral-50 animate-pulse rounded-lg"></div>
                  <div className="h-10 w-full bg-neutral-50 animate-pulse rounded-lg"></div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <AdminHeader title="Chỉnh sửa sản phẩm" />

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
                {isSubmitting ? 'Đang lưu...' : 'Cập nhật sản phẩm'}
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
                      Giá bán gốc (VNĐ) <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="base_price"
                      value={inputs.base_price}
                      onChange={handleChange}
                      type="number"
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
                          <span className="text-xs font-bold text-neutral-500">Biến thể #{index + 1} {v.id ? `(ID: ${v.id})` : '(Mới)'}</span>
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
                                className="w-full px-3 py-1.5 border border-neutral-200 rounded-lg text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-neutral-600 mb-1">Giá biến thể *</label>
                              <input 
                                type="number" value={v.price} onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                                className="w-full px-3 py-1.5 border border-neutral-200 rounded-lg text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-neutral-600 mb-1">Tồn kho</label>
                              <input 
                                type="number" value={v.stock_quantity} onChange={(e) => handleVariantChange(index, 'stock_quantity', e.target.value)}
                                className="w-full px-3 py-1.5 border border-neutral-200 rounded-lg text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-neutral-600 mb-1">Màu sắc</label>
                              <input 
                                type="text" value={v.color} onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
                                className="w-full px-3 py-1.5 border border-neutral-200 rounded-lg text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-neutral-600 mb-1">Kích cỡ tổng quát</label>
                              <input 
                                type="text" value={v.size} onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                                className="w-full px-3 py-1.5 border border-neutral-200 rounded-lg text-xs"
                              />
                            </div>
                          </div>

                          {/* Hàng 2: Thuộc tính Nội thất (Gỗ, Nỉ, Hoàn thiện, Nặng) */}
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-white p-2.5 rounded-lg border border-neutral-100">
                            <div>
                              <label className="block text-xs font-medium text-neutral-500 mb-1">Loại gỗ</label>
                              <input 
                                type="text" value={v.wood_type} onChange={(e) => handleVariantChange(index, 'wood_type', e.target.value)}
                                className="w-full px-3 py-1.5 border border-neutral-200 rounded-lg text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-neutral-500 mb-1">Vải bọc / Da</label>
                              <input 
                                type="text" value={v.upholstery} onChange={(e) => handleVariantChange(index, 'upholstery', e.target.value)}
                                className="w-full px-3 py-1.5 border border-neutral-200 rounded-lg text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-neutral-500 mb-1">Hoàn thiện bề mặt</label>
                              <input 
                                type="text" value={v.finish} onChange={(e) => handleVariantChange(index, 'finish', e.target.value)}
                                className="w-full px-3 py-1.5 border border-neutral-200 rounded-lg text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-neutral-500 mb-1">Trọng lượng (kg)</label>
                              <input 
                                type="number" step="0.1" value={v.weight_kg} onChange={(e) => handleVariantChange(index, 'weight_kg', e.target.value)}
                                className="w-full px-3 py-1.5 border border-neutral-200 rounded-lg text-xs"
                              />
                            </div>
                          </div>

                          {/* Hàng 3: Kích thước Số lượng CM */}
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-neutral-100/30 p-2.5 rounded-lg">
                            <div>
                              <label className="block text-xs font-medium text-neutral-500 mb-1">Dài (width_cm)</label>
                              <input 
                                type="number" value={v.width_cm} onChange={(e) => handleVariantChange(index, 'width_cm', e.target.value)}
                                className="w-full px-3 py-1.5 border border-neutral-200 rounded-lg text-xs bg-white"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-neutral-500 mb-1">Rộng (depth_cm)</label>
                              <input 
                                type="number" value={v.depth_cm} onChange={(e) => handleVariantChange(index, 'depth_cm', e.target.value)}
                                className="w-full px-3 py-1.5 border border-neutral-200 rounded-lg text-xs bg-white"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-neutral-500 mb-1">Cao (height_cm)</label>
                              <input 
                                type="number" value={v.height_cm} onChange={(e) => handleVariantChange(index, 'height_cm', e.target.value)}
                                className="w-full px-3 py-1.5 border border-neutral-200 rounded-lg text-xs bg-white"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-neutral-500 mb-1">Cao ghế (seat_height_cm)</label>
                              <input 
                                type="text" value={v.seat_height_cm} onChange={(e) => handleVariantChange(index, 'seat_height_cm', e.target.value)}
                                className="w-full px-3 py-1.5 border border-neutral-200 rounded-lg text-xs bg-white"
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
                <h3 className="text-base font-bold text-neutral-900 mb-5">Hình ảnh sản phẩm</h3>
                
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
