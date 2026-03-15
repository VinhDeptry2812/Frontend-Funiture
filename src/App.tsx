/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams, useLocation, Navigate } from 'react-router-dom';
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
import { AdminLayout } from './components/admin/layout/AdminLayout';
import { AdminDashboard } from './components/admin/pages/AdminDashboard';
import { AdminCategories } from './components/admin/pages/AdminCategories';
import { AdminProducts } from './components/admin/pages/AdminProducts';
import { AdminProductCreate } from './components/admin/pages/AdminProductCreate';
import { AdminProductEdit } from './components/admin/pages/AdminProductEdit';
import { productService } from './Service/productService';
import { Product } from './types';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const ProductDetailWrapper: React.FC<{ onAddToCart: (product: any, quantity: number) => void }> = ({ onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
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
      <button onClick={() => navigate('/products')} className="bg-black text-white px-6 py-2">Quay lại cửa hàng</button>
    </div>
  );

  return (
    <ProductDetail 
      product={product} 
      onAddToCart={onAddToCart}
    />
  );
};

function AppContent() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<{ product: any; quantity: number }[]>([]);

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


  return (
    <div className="min-h-screen bg-white font-sans text-neutral-900">
      <ScrollToTop />
      <Routes>
        {/* Pages without Header/Footer */}
        <Route path="/cart" element={<CartPage cartItems={cartItems} onUpdateQuantity={updateQuantity} onRemoveItem={removeFromCart} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Admin Dashboard Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<div className="p-8 bg-white m-8 rounded-2xl shadow-sm h-64 flex items-center justify-center font-bold text-neutral-400">Orders Page (Coming soon)</div>} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="products" element={<AdminProducts/>} />
          <Route path="products/create" element={<AdminProductCreate />} />
          <Route path="products/edit/:id" element={<AdminProductEdit />} />
          <Route path="customers" element={<div className="p-8 bg-white m-8 rounded-2xl shadow-sm h-64 flex items-center justify-center font-bold text-neutral-400">Customers Page (Coming soon)</div>} />
          <Route path="reports" element={<div className="p-8 bg-white m-8 rounded-2xl shadow-sm h-64 flex items-center justify-center font-bold text-neutral-400">Reports Page (Coming soon)</div>} />
          <Route path="settings" element={<div className="p-8 bg-white m-8 rounded-2xl shadow-sm h-64 flex items-center justify-center font-bold text-neutral-400">Settings Page (Coming soon)</div>} />
        </Route>

        {/* Pages with Header/Footer */}
        <Route path="*" element={
          <>
            <Header cartCount={cartCount} />
            <main>
              <Routes>
                <Route path="/" element={
                  <>
                    <Hero />
                    <Categories />
                    <FeaturedProducts />
                    <Features />
                    <Testimonials />
                  </>
                } />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/product/:id" element={<ProductDetailWrapper onAddToCart={addToCart} />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/500" element={<ServerErrorPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </>
        } />
      </Routes>
    </div>
  );
}

import { ToastProvider } from './contexts/ToastContext';
// End of file

export default function App() {
  return (
    <Router>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </Router>
  );
}
