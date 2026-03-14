import React from 'react';
import { X, Minus, Plus, Truck, Wallet, ArrowRight, Lock, ChevronRight, Armchair, CreditCard, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { formatPrice, getImageUrl } from '../utils';

interface CartPageProps {
  cartItems: { product: any; quantity: number }[];
  onNavigate: (view: 'home' | 'products' | 'detail' | 'cart' | 'login' | 'register' | 'forgot-password' | 'reset-password' | 'admin-login' | 'profile', productId?: number) => void;
  onUpdateQuantity: (productId: number, delta: number) => void;
  onRemoveItem: (productId: number) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ 
  cartItems, 
  onNavigate, 
  onUpdateQuantity, 
  onRemoveItem 
}) => {
  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.product.sale_price || item.product.base_price;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 lg:px-20 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 bg-black flex items-center justify-center rounded-sm">
              <Armchair className="text-white h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-black">NoiThat</h1>
          </div>
          {/* Progress Indicator */}
          <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
            <button onClick={() => onNavigate('cart')} className="text-black border-b-2 border-black pb-1">Giỏ hàng</button>
            <ChevronRight className="h-4 w-4 text-slate-300" />
            <span className="text-slate-400">Thanh toán</span>
            <ChevronRight className="h-4 w-4 text-slate-300" />
            <span className="text-slate-400">Hoàn tất</span>
          </nav>
          {/* Security Icon */}
          <div className="flex items-center gap-2 text-slate-500">
            <Lock className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Bảo mật 100%</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-20 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Checkout Form */}
          <div className="lg:col-span-7 space-y-12">
            {/* Section: Cart Items */}
            <section>
              <h2 className="text-2xl font-bold mb-8 tracking-tight">Giỏ hàng của bạn</h2>
              {cartItems.length === 0 ? (
                <div className="text-center py-12 bg-neutral-50 rounded-xl">
                  <p className="text-neutral-500 mb-6">Giỏ hàng của bạn đang trống</p>
                  <button 
                    onClick={() => onNavigate('products')}
                    className="bg-black text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all"
                  >
                    Tiếp tục mua sắm
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex gap-6 items-center group">
                      <div className="w-24 h-24 bg-neutral-50 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer" onClick={() => onNavigate('detail', item.product.id)}>
                        <img 
                          src={getImageUrl(item.product.image_url)} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <h3 
                            onClick={() => onNavigate('detail', item.product.id)}
                            className="font-bold text-lg cursor-pointer hover:underline truncate max-w-[200px]"
                          >
                            {item.product.name}
                          </h3>
                          <button 
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-slate-400 hover:text-red-500 transition-colors"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                        <p className="text-slate-500 text-sm mt-1">
                          Mã SP: {item.product.sku || 'N/A'}
                        </p>
                        <div className="flex justify-between items-end mt-2">
                          <div className="flex items-center border border-slate-200 rounded px-2 py-1 gap-4">
                            <button 
                              onClick={() => onUpdateQuantity(item.product.id, -1)}
                              className="text-slate-400 hover:text-black transition-colors px-1"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-sm font-bold min-w-[20px] text-center">{item.quantity}</span>
                            <button 
                              onClick={() => onUpdateQuantity(item.product.id, 1)}
                              className="text-slate-400 hover:text-black transition-colors px-1"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <p className="font-bold">{formatPrice(item.product.sale_price || item.product.base_price)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <hr className="border-slate-100" />

            {/* Section: Shipping Info */}
            <section>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 tracking-tight">
                <Truck className="h-5 w-5 text-black" />
                Thông tin giao hàng
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 ml-1">Họ tên</label>
                  <input 
                    type="text" 
                    placeholder="Nguyễn Văn A" 
                    className="w-full border-slate-200 focus:border-black focus:ring-0 rounded-lg py-3 px-4 text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 ml-1">Số điện thoại</label>
                  <input 
                    type="tel" 
                    placeholder="090 123 4567" 
                    className="w-full border-slate-200 focus:border-black focus:ring-0 rounded-lg py-3 px-4 text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 ml-1">Email</label>
                  <input 
                    type="email" 
                    placeholder="example@gmail.com" 
                    className="w-full border-slate-200 focus:border-black focus:ring-0 rounded-lg py-3 px-4 text-sm bg-white"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 ml-1">Địa chỉ</label>
                  <textarea 
                    placeholder="Số nhà, tên đường, phường/xã..." 
                    rows={2}
                    className="w-full border-slate-200 focus:border-black focus:ring-0 rounded-lg py-3 px-4 text-sm bg-white"
                  />
                </div>
              </div>
            </section>

            {/* Section: Payment Methods */}
            <section>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 tracking-tight">
                <Wallet className="h-5 w-5 text-black" />
                Phương thức thanh toán
              </h2>
              <div className="space-y-3">
                {[
                  { id: 'cod', label: 'Thanh toán khi nhận hàng (COD)' },
                  { id: 'bank', label: 'Chuyển khoản ngân hàng' },
                  { id: 'card', label: 'Thẻ VISA / Mastercard' }
                ].map((method) => (
                  <label key={method.id} className="flex items-center p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                    <input 
                      type="radio" 
                      name="payment" 
                      defaultChecked={method.id === 'cod'}
                      className="w-4 h-4 text-black focus:ring-black border-slate-300" 
                    />
                    <span className="ml-4 text-sm font-medium">{method.label}</span>
                  </label>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Order Summary Sidebar */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-neutral-50 p-8 rounded-xl border border-neutral-100 shadow-sm">
              <h2 className="text-xl font-bold mb-8 tracking-tight">Tóm tắt đơn hàng</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Tạm tính ({cartItems.length} sản phẩm)</span>
                  <span className="font-bold text-black">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Phí giao hàng</span>
                  <span className="text-emerald-600 font-bold">Miễn phí</span>
                </div>
                <hr className="border-slate-200" />
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-lg">Tổng cộng</span>
                  <span className="text-xl font-bold text-black">{formatPrice(subtotal)}</span>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Mã giảm giá" 
                    className="flex-grow border-slate-200 focus:border-black focus:ring-0 rounded-lg py-2.5 px-4 text-sm bg-white"
                  />
                  <button className="bg-black/10 text-black hover:bg-black hover:text-white px-4 py-2.5 rounded-lg text-sm font-bold transition-all">
                    Áp dụng
                  </button>
                </div>
              </div>

              <button className="w-full bg-black text-white py-4 rounded-lg font-bold text-lg hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 group">
                Hoàn tất đặt hàng
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="mt-8 pt-8 border-t border-slate-200">
                <div className="flex justify-center gap-6 mb-4 opacity-40">
                  <CreditCard className="h-8 w-8" />
                  <Wallet className="h-8 w-8" />
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest font-bold">
                  An toàn • Bảo mật • Nhanh chóng
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-100 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
          <div className="flex gap-8 text-sm text-slate-500 font-medium">
            <button className="hover:text-black transition-colors">Chính sách</button>
            <button className="hover:text-black transition-colors">Bảo hành</button>
            <button className="hover:text-black transition-colors">Liên hệ</button>
          </div>
          <p className="text-sm text-slate-400">© 2026 NoiThat. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
