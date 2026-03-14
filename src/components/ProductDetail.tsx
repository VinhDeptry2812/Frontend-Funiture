import React, { useState } from 'react';
import { ChevronRight, Star, Minus, Plus, ShoppingCart, Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { sofaProducts } from '../constants';

interface ProductDetailProps {
  product: Product;
  onNavigate: (view: 'home' | 'products' | 'detail' | 'cart' | 'login' | 'register' | 'forgot-password' | 'reset-password' | 'admin-login' | 'profile', productId?: number) => void;
  onAddToCart: (quantity: number) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onNavigate, onAddToCart }) => {
  const [selectedImage, setSelectedImage] = useState(product.gallery?.[0] || product.image);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');

  const relatedProducts = sofaProducts.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <ol className="flex items-center space-x-2 text-sm text-neutral-500">
          <li>
            <button onClick={() => onNavigate('home')} className="hover:text-black transition-colors">Trang chủ</button>
          </li>
          <ChevronRight className="h-4 w-4" />
          <li>
            <button onClick={() => onNavigate('products')} className="hover:text-black transition-colors">Sofa</button>
          </li>
          <ChevronRight className="h-4 w-4" />
          <li className="font-medium text-black">{product.name}</li>
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
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.gallery?.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${selectedImage === img ? 'border-black' : 'border-transparent hover:border-neutral-300'}`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
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
                <span className="text-sm text-neutral-500">42 Đánh giá</span>
              </div>
              <p className="text-3xl font-bold text-black">{product.price}</p>
            </div>

            <p className="text-neutral-600 leading-relaxed">
              {product.description || 'Sản phẩm cao cấp với thiết kế hiện đại, mang lại sự thoải mái và sang trọng cho không gian sống của bạn.'}
            </p>

            <div className="space-y-6">
              {product.colors && (
                <div>
                  <span className="block text-xs font-bold uppercase tracking-widest mb-3 text-neutral-400">Màu sắc</span>
                  <div className="flex gap-3">
                    {product.colors.map(color => (
                      <button 
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        style={{ backgroundColor: color }}
                        className={`w-8 h-8 rounded-full ring-offset-2 transition-all ${selectedColor === color ? 'ring-2 ring-black' : 'hover:ring-2 ring-neutral-200'}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {product.sizes && (
                <div>
                  <span className="block text-xs font-bold uppercase tracking-widest mb-3 text-neutral-400">Kích thước</span>
                  <div className="flex gap-3">
                    {product.sizes.map(size => (
                      <button 
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-2 border text-sm font-medium transition-all ${selectedSize === size ? 'bg-black text-white border-black' : 'border-neutral-200 hover:border-black'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

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
              <button className="flex-1 bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2">
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
                <span className="text-xs font-medium text-neutral-500">Giao hàng miễn phí nội thành</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-neutral-100 p-2 rounded-full">
                  <ShieldCheck className="h-5 w-5 text-black" />
                </div>
                <span className="text-xs font-medium text-neutral-500">Bảo hành 2 năm tận nơi</span>
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
              Thông số kỹ thuật
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all border-b-2 ${activeTab === 'reviews' ? 'border-black text-black' : 'border-transparent text-neutral-400 hover:text-black'}`}
            >
              Đánh giá (42)
            </button>
          </div>

          <div className="py-10">
            {activeTab === 'description' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <p className="text-neutral-600 leading-relaxed">
                    {product.description}
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                      <CheckCircle2 className="h-6 w-6 text-black shrink-0" />
                      <div>
                        <h4 className="font-bold text-sm">Chất liệu thân thiện</h4>
                        <p className="text-sm text-neutral-500">Vải sợi tự nhiên không gây kích ứng da, dễ vệ sinh.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <CheckCircle2 className="h-6 w-6 text-black shrink-0" />
                      <div>
                        <h4 className="font-bold text-sm">Đệm ngồi foam mật độ cao</h4>
                        <p className="text-sm text-neutral-500">Duy trì form dáng sau thời gian dài sử dụng.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="bg-neutral-50 p-8 rounded-2xl">
                  <h4 className="font-bold text-lg mb-6">Đặc điểm nổi bật</h4>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    Thiết kế dựa trên triết lý "Less is More", tập trung vào những đường nét thanh mảnh nhưng vô cùng chắc chắn. Phù hợp với nhiều phong cách nội thất từ hiện đại đến tối giản.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-2xl">
                <div className="space-y-4">
                  {product.specs && Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b border-neutral-100 pb-4">
                      <span className="text-sm text-neutral-500">{key}</span>
                      <span className="text-sm font-bold text-black">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="text-center py-10">
                <p className="text-neutral-500">Chưa có đánh giá chi tiết nào được hiển thị ở đây.</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <section>
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold tracking-tight">Có thể bạn sẽ thích</h2>
            <button 
              onClick={() => onNavigate('products')}
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
                onClick={() => onNavigate('detail', p.id)}
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100 mb-4">
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <button className="absolute bottom-4 left-4 right-4 bg-white text-black py-3 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">
                    Xem chi tiết
                  </button>
                </div>
                <h3 className="font-bold text-sm uppercase tracking-tight mb-1">{p.name}</h3>
                <p className="text-neutral-500 text-sm italic mb-1">Màu sắc đa dạng</p>
                <p className="font-bold text-black">{p.price}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
