/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Categories } from './components/Categories';
import { FeaturedProducts } from './components/FeaturedProducts';
import { Features } from './components/Features';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { ProductPage } from './components/pages/ProductPage';
import { ProductDetail } from './components/pages/ProductDetail';
import { CartPage } from './components/pages/CartPage';
import { LoginPage } from './components/pages/LoginPage';
import { RegisterPage } from './components/pages/RegisterPage';
import { ForgotPasswordPage } from './components/pages/ForgotPasswordPage';
import { ResetPasswordPage } from './components/pages/ResetPasswordPage';
import { AdminLoginPage } from './components/pages/AdminLoginPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { ContactPage } from './components/pages/ContactPage';
import { NotFoundPage } from './components/pages/NotFoundPage';
import { ServerErrorPage } from './components/pages/ServerErrorPage';
import { AboutPage } from './components/pages/AboutPage';
import { productService } from './Service/productService';
import { Product } from './types';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function AppContent() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<{ product: any; quantity: number }[]>([]);

  const handleNavigate = (v: string, id?: number) => {
    if (v === 'home') navigate('/');
    else if (v === 'products') navigate('/products');
    else if (v === 'detail' && id) navigate(`/product/${id}`);
    else if (v === 'cart') navigate('/cart');
    else if (v === 'login') navigate('/login');
    else if (v === 'register') navigate('/register');
    else if (v === 'forgot-password') navigate('/forgot-password');
    else if (v === 'reset-password') navigate('/reset-password');
    else if (v === 'admin-login') navigate('/admin/login');
    else if (v === 'profile') navigate('/profile');
    else if (v === 'contact') navigate('/contact');
    else if (v === 'about') navigate('/about');
    else if (v === '500') navigate('/500');
  };

  const addToCart = (product: any, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const ProductDetailWrapper = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchProduct = async () => {
        if (!id) return;
        try {
          const res = await productService.getProductById(id);
          setProduct(res.data);
        } catch (error) {
          console.error('Failed to fetch product:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }, [id]);

    if (loading) return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
    
    if (!product) return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">Sản phẩm không tồn tại</h2>
        <button onClick={() => handleNavigate('products')} className="bg-black text-white px-6 py-2">Quay lại cửa hàng</button>
      </div>
    );

    return (
      <ProductDetail 
        product={product} 
        onNavigate={handleNavigate as any} 
        onAddToCart={(p, qty) => addToCart(p, qty)}
      />
    );
  };

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900">
      <ScrollToTop />
      <Routes>
        {/* Pages without Header/Footer */}
        <Route path="/cart" element={<CartPage cartItems={cartItems} onNavigate={handleNavigate as any} onUpdateQuantity={updateQuantity} onRemoveItem={removeFromCart} />} />
        <Route path="/login" element={<LoginPage onNavigate={handleNavigate as any} />} />
        <Route path="/register" element={<RegisterPage onNavigate={handleNavigate as any} />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage onNavigate={handleNavigate as any} />} />
        <Route path="/reset-password" element={<ResetPasswordPage onNavigate={handleNavigate as any} />} />
        <Route path="/admin/login" element={<AdminLoginPage onNavigate={handleNavigate as any} />} />

        {/* Pages with Header/Footer */}
        <Route path="*" element={
          <>
            <Header onNavigate={handleNavigate as any} cartCount={cartCount} />
            <main>
              <Routes>
                <Route path="/" element={
                  <>
                    <Hero />
                    <Categories onNavigate={handleNavigate as any} />
                    <FeaturedProducts onNavigate={handleNavigate as any} />
                    <Features />
                    <Testimonials />
                  </>
                } />
                <Route path="/products" element={<ProductPage onNavigate={handleNavigate as any} />} />
                <Route path="/product/:id" element={<ProductDetailWrapper />} />
                <Route path="/profile" element={<ProfilePage onNavigate={handleNavigate as any} />} />
                <Route path="/contact" element={<ContactPage onNavigate={handleNavigate as any} />} />
                <Route path="/about" element={<AboutPage onNavigate={handleNavigate as any} />} />
                <Route path="/500" element={<ServerErrorPage onNavigate={handleNavigate as any} />} />
                <Route path="*" element={<NotFoundPage onNavigate={handleNavigate as any} />} />
              </Routes>
            </main>
            <Footer onNavigate={handleNavigate as any} />
          </>
        } />
      </Routes>
    </div>
  );
}

import { ToastProvider } from './contexts/ToastContext';

export default function App() {
  return (
    <Router>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </Router>
  );
}
