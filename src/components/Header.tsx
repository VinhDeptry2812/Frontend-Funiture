import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Menu, X, Armchair, User, ChevronDown, Loader2, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { authService } from '../Service/authService';
import { useNavigate, Link } from 'react-router-dom';
import { SearchBar } from './layout/Header/SearchBar';
import { UserMenu } from './layout/Header/UserMenu';

interface HeaderProps {
  cartCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ cartCount = 0 }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState<any>(() => {
    const saved = localStorage.getItem('user');
    if (!saved || saved === 'undefined') return null;
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Lỗi parse user từ localStorage:', e);
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token'); // Khóa CHỈ dành cho FE thường
      if (token) {
        setLoading(true);
        try {
          const res = await authService.getProfile();
          setUser(res.user);
        } catch (error) {
          console.error("Lỗi lấy thông tin người dùng:", error);
          localStorage.removeItem('token');
          setUser(null);
        } finally {
          setLoading(false);
        }
      } else {
        // 🔒 Bảo vệ: Nếu KHÔNG CÓ 'token' (Khách hàng), buộc dọn rác 'user_info' cũ đọng lại
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem('token');
      setUser(null);
      navigate('/');
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
    }
  };

  const categories = ['Sofa', 'Bàn ghế', 'Phòng ngủ', 'Trang trí', 'Đèn chiếu sáng'];

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8 lg:gap-12">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 group">
            <Armchair className="h-8 w-8 text-black transition-transform group-hover:scale-110" />
            <span className="text-2xl font-bold tracking-tighter uppercase">NoiThat</span>
          </button>
          
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => navigate('/products')}
              className="text-sm font-medium text-neutral-600 hover:text-black transition-colors"
            >
              Sản phẩm
            </button>
            
            <div 
              className="relative group"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-neutral-600 hover:text-black transition-colors py-8">
                Danh mục <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 top-full w-48 bg-white border border-neutral-100 shadow-xl rounded-lg py-2 overflow-hidden"
                  >
                    {categories.map((cat) => (
                      <button 
                        key={cat} 
                        onClick={() => {
                          if (cat === 'Sofa') navigate('/products');
                          setIsDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-black transition-colors"
                      >
                        {cat}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              onClick={() => navigate('/contact')}
              className="text-sm font-medium text-neutral-600 hover:text-black transition-colors"
            >
              Liên hệ
            </button>
            <button 
              onClick={() => navigate('/about')}
              className="text-sm font-medium text-neutral-600 hover:text-black transition-colors"
            >
              Về chúng tôi
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-4 lg:gap-6">
          <SearchBar />
          
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => navigate('/cart')}
              className="relative p-2 hover:bg-neutral-100 rounded-full transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
            
            <UserMenu 
              user={user} 
              loading={loading} 
              // UserMenu refactoring will remove its onNavigate prop. We can leave it empty for now or remove it.

            />

            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-neutral-100 bg-white overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              <button 
                onClick={() => { navigate('/products'); setIsMenuOpen(false); }}
                className="block w-full text-left text-lg font-medium py-2 border-b border-neutral-50"
              >
                Sản phẩm
              </button>
              
              <div className="py-2">
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">Danh mục</p>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <button 
                      key={cat} 
                      onClick={() => {
                        if (cat === 'Sofa') navigate('/products');
                        setIsMenuOpen(false);
                      }}
                      className="text-left text-base text-neutral-600 py-1"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => { navigate('/contact'); setIsMenuOpen(false); }}
                className="block w-full text-left text-lg font-medium py-2 border-b border-neutral-50"
              >
                Liên hệ
              </button>
              <button 
                onClick={() => { navigate('/about'); setIsMenuOpen(false); }}
                className="block w-full text-left text-lg font-medium py-2 border-b border-neutral-50"
              >
                Về chúng tôi
              </button>
              
              {user ? (
                <div className="space-y-3 pt-4 border-t border-neutral-100">
                  <button 
                    className="w-full bg-black text-white py-4 font-bold uppercase flex items-center justify-center gap-2"
                    onClick={() => { navigate('/profile'); setIsMenuOpen(false); }}
                  >
                    <div className="h-5 w-5 bg-white text-black rounded-full flex items-center justify-center text-[8px] font-black">
                      {user.name?.charAt(0)}
                    </div>
                    Hồ sơ: {user.name}
                  </button>
                  <button 
                    className="w-full border border-neutral-200 py-4 font-bold uppercase text-neutral-500 flex items-center justify-center gap-2 hover:bg-neutral-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5" /> Đăng xuất
                  </button>
                </div>
              ) : (
                <button 
                  className="mt-4 w-full border border-black py-4 font-bold uppercase flex items-center justify-center gap-2"
                  onClick={() => { navigate('/login'); setIsMenuOpen(false); }}
                >
                  <User className="h-5 w-5" /> Đăng nhập
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
