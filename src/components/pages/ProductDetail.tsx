import React, { useState, useEffect } from 'react';
import { ChevronRight, Star, Minus, Plus, ShoppingCart, Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { productService } from '../../Service/productService';
import { formatPrice, getImageUrl } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../contexts/ToastContext'; // 👈 Thêm ToastContext

interface ProductDetailProps {
  product: any;
  onAddToCart: (product: any, quantity: number) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart }) => {
  const navigate = useNavigate();
  const { showToast } = useToast(); // 👈 Khởi tạo showToast

  const [selectedImage, setSelectedImage] = useState(getImageUrl(product.image_url));
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

  const handleAddToCartClick = () => {
    onAddToCart(product, quantity);
    showToast(`🎉 Đã thêm ${quantity} sản phẩm ${product.name} vào giỏ hàng!`, 'success'); // 👈 Hiển thị Toast
  };

  useEffect(() => {
    setSelectedImage(getImageUrl(product.image_url));
    
    // Fetch related products (e.g., from same category)
    const fetchRelated = async () => {
      try {
        const response = await productService.getProducts();
        setRelatedProducts(response.data.filter((p: any) => p.id !== product.id).slice(0, 4));
      } catch (error) {
        console.error('Failed to fetch related products:', error);
      }
    };
    fetchRelated();
  }, [product]);

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <ol className="flex items-center space-x-2 text-sm text-neutral-500">
          <li>
            <button onClick={() => navigate('/')} className="hover:text-black transition-colors">Trang chủ</button>
          </li>
          <ChevronRight className="h-4 w-4" />
          <li>
            <button onClick={() => navigate('/products')} className="hover:text-black transition-colors">Sản phẩm</button>
          </li>
          <ChevronRight className="h-4 w-4" />
          <li className="font-medium text-black truncate max-w-[200px]">{product.name}</li>
        </ol>
      </nav>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Left: Product Images */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="aspect-[4/3] w-full bg-neutral-100 overflow-hidden rounded-2xl">
              <img 
                src={selectedImage} 
                alt={product.name} 
                className="w-full h-full object-cover transition-all duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Gallery: Gom ảnh chính và tất cả ảnh biến thể */}
            <div className="grid grid-cols-6 gap-3">
               {Array.from(new Set([
                 getImageUrl(product.image_url),
                 ...(product.variants || []).map((v: any) => v.image_url ? getImageUrl(v.image_url) : '')
               ])).filter(Boolean).map((imgUrl: string, index: number) => (
                 <button 
                    key={index}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${selectedImage === imgUrl ? 'border-black shadow-sm' : 'border-neutral-100 hover:border-neutral-300'}`}
                  >
                    <img src={imgUrl} alt={`Gallery ${index}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
               ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-neutral-900 mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < 4 ? 'fill-current' : 'fill-none'}`} />
                  ))}
                </div>
                <span className="text-sm text-neutral-500">Người dùng yêu thích</span>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-3xl font-bold text-black">{formatPrice(product.sale_price || product.base_price)}</p>
                {product.sale_price && product.base_price > product.sale_price && (
                  <p className="text-xl text-neutral-400 line-through">{formatPrice(product.base_price)}</p>
                )}
              </div>
            </div>

            <p className="text-neutral-600 leading-relaxed">
              {product.description || 'Sản phẩm nội thất cao cấp với phong cách Scandinavian tối giản, mang lại sự sang trọng và ấm cúng cho không gian sống của bạn.'}
            </p>

            <div className="space-y-6">
              {/* Material/Brand info */}
              <div className="grid grid-cols-2 gap-4">
                {product.material && (
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-widest mb-1 text-neutral-400">Chất liệu</span>
                    <span className="text-sm font-medium">{product.material}</span>
                  </div>
                )}
                {product.brand && (
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-widest mb-1 text-neutral-400">Thương hiệu</span>
                    <span className="text-sm font-medium">{product.brand}</span>
                  </div>
                )}
              </div>

              <div>
                <span className="block text-xs font-bold uppercase tracking-widest mb-3 text-neutral-400">Số lượng</span>
                <div className="flex items-center border border-neutral-200 w-fit rounded-lg overflow-hidden">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-neutral-50 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-6 text-sm font-bold w-12 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-neutral-50 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={handleAddToCartClick}
                className="flex-1 bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="h-5 w-5" /> Thêm vào giỏ hàng
              </button>
              <button className="flex-1 border-2 border-black text-black py-4 font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                Mua ngay
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-neutral-100">
              <div className="flex items-center gap-3">
                <div className="bg-neutral-100 p-2 rounded-full">
                  <Truck className="h-5 w-5 text-black" />
                </div>
                <span className="text-xs font-medium text-neutral-500">Giao hàng toàn quốc</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-neutral-100 p-2 rounded-full">
                  <ShieldCheck className="h-5 w-5 text-black" />
                </div>
                <span className="text-xs font-medium text-neutral-500">Bảo hành chính hãng</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mb-20">
          <div className="flex border-b border-neutral-100 gap-10 overflow-x-auto">
            <button 
              onClick={() => setActiveTab('description')}
              className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all border-b-2 ${activeTab === 'description' ? 'border-black text-black' : 'border-transparent text-neutral-400 hover:text-black'}`}
            >
              Mô tả
            </button>
            <button 
              onClick={() => setActiveTab('specs')}
              className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all border-b-2 ${activeTab === 'specs' ? 'border-black text-black' : 'border-transparent text-neutral-400 hover:text-black'}`}
            >
              Chi tiết
            </button>
          </div>

          <div className="py-10">
            {activeTab === 'description' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <p className="text-neutral-600 leading-relaxed font-light">
                    {product.description || 'Không có mô tả chi tiết cho sản phẩm này.'}
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                      <CheckCircle2 className="h-6 w-6 text-black shrink-0" />
                      <div>
                        <h4 className="font-bold text-sm">Chất lượng đảm bảo</h4>
                        <p className="text-sm text-neutral-500">Sản phẩm được kiểm định nghiêm ngặt trước khi xuất xưởng.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-2xl">
                <div className="space-y-4 font-light">
                   <div className="flex justify-between border-b border-neutral-100 pb-4">
                      <span className="text-sm text-neutral-500 uppercase tracking-widest">Mã sản phẩm</span>
                      <span className="text-sm font-bold text-black">{product.sku || 'N/A'}</span>
                    </div>
                    {product.category && (
                      <div className="flex justify-between border-b border-neutral-100 pb-4">
                        <span className="text-sm text-neutral-500 uppercase tracking-widest">Danh mục</span>
                        <span className="text-sm font-bold text-black">{product.category.name}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-b border-neutral-100 pb-4">
                      <span className="text-sm text-neutral-500 uppercase tracking-widest">Chất liệu</span>
                      <span className="text-sm font-bold text-black">{product.material || 'Đang cập nhật'}</span>
                    </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <section>
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold tracking-tight">Có thể bạn sẽ thích</h2>
            <button 
              onClick={() => navigate('/products')}
              className="text-sm font-bold underline underline-offset-8 decoration-black hover:opacity-70 transition-opacity"
            >
              Xem tất cả
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <motion.div 
                key={p.id}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
                onClick={() => navigate(`/product/${p.id}`)}
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100 mb-4">
                  <img 
                    src={getImageUrl(p.image_url)} 
                    alt={p.name} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <button className="absolute bottom-4 left-4 right-4 bg-white text-black py-3 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">
                    Xem chi tiết
                  </button>
                </div>
                <h3 className="font-bold text-sm uppercase tracking-tight mb-1 truncate">{p.name}</h3>
                <p className="font-bold text-black">{formatPrice(p.sale_price || p.base_price)}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
