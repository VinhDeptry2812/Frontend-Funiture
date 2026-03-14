import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Armchair, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import api from '../../Service/service';
import { useToast } from '../../contexts/ToastContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { SocialLogin } from '../features/auth/SocialLogin';

interface LoginPageProps {
  onNavigate: (view: 'home' | 'products' | 'detail' | 'cart' | 'login' | 'register' | 'forgot-password' | 'reset-password' | 'admin-login' | 'profile') => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const handleLogin = async () => {
    setError('');
    setIsLoading(true);
    try {
      const response = await api.post('/login', {
        email, password
      });
      
      const { token, user, message } = response.data;
      handleLoginSuccess(token, user, message);
    } catch (err: any) {
      const message = err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại.';
      setError(message);
      showToast(message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSuccess = (token: string, user: any, message: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    showToast(message || 'Đăng nhập thành công', 'success');
    
    setTimeout(() => {
      onNavigate('home');
    }, 1500);
  };

  return (
    <div className="flex min-h-screen w-full bg-white text-neutral-900 overflow-hidden">
      {/* Left Side: Aesthetic Image */}
      <div className="relative hidden lg:block lg:w-1/2 h-screen">
        <img
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=2000"
          alt="Interior Design"
          className="absolute inset-0 h-full w-full object-cover grayscale contrast-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-12 left-12 text-white max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-3xl font-bold mb-4">Kiến tạo không gian sống mơ ước</h3>
            <p className="text-neutral-200">Đăng nhập để lưu lại những sản phẩm yêu thích và nhận ưu đãi đặc quyền từ NoiThat.</p>
          </motion.div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 h-screen flex flex-col bg-white relative overflow-y-auto">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('home')}
          className="absolute top-8 left-8 z-10 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-neutral-400 hover:text-black transition-colors bg-white/80 backdrop-blur-sm p-2 rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại
        </button>

        <div className="flex-1 flex flex-col items-center justify-center py-24 px-8 sm:px-16 lg:px-20">
          {/* Branding */}
          <div
            className="mb-12 flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <Armchair className="h-10 w-10 text-black" />
            <h1 className="text-2xl font-bold tracking-tighter uppercase">NoiThat</h1>
          </div>

          {/* Login Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-[400px]"
          >
            <div className="mb-10 text-center">
              <h2 className="text-4xl font-bold tracking-tight text-neutral-900">Đăng nhập</h2>
              <p className="text-neutral-500 mt-3">Chào mừng bạn trở lại với không gian đẳng cấp.</p>
            </div>

            <form 
              className="space-y-6" 
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-4 bg-rose-50 border border-rose-100 text-rose-600 text-sm font-medium"
                >
                  {error}
                </motion.div>
              )}

              <Input 
                label="Email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-5 h-5" />}
              />

              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <label className="text-sm font-bold text-neutral-700 uppercase tracking-wider">Mật khẩu</label>
                  <button
                    type="button"
                    onClick={() => onNavigate('forgot-password')}
                    className="text-xs font-bold uppercase tracking-widest text-neutral-900 hover:underline underline-offset-4"
                  >
                    Quên mật khẩu?
                  </button>
                </div>
                <Input 
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  leftIcon={<Lock className="w-5 h-5" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  }
                />
              </div>

              {/* Remember */}
              <label className="flex items-center gap-3 cursor-pointer group w-fit">
                <input type="checkbox" className="rounded-none border-neutral-300 text-black focus:ring-black h-5 w-5" />
                <span className="text-sm font-medium text-neutral-600 group-hover:text-black transition-colors">Ghi nhớ đăng nhập</span>
              </label>

              <Button 
                type="submit"
                isLoading={isLoading}
                fullWidth
                size="xl"
              >
                Đăng nhập ngay
              </Button>
            </form>

            <SocialLogin onSuccess={handleLoginSuccess} />

            {/* Footer Link */}
            <p className="mt-12 text-center text-neutral-500 text-sm">
              Chưa có tài khoản?
              <button
                onClick={() => onNavigate('register')}
                className="text-black font-bold uppercase tracking-widest hover:underline underline-offset-4 ml-2"
              >
                Đăng ký ngay
              </button>
            </p>
          </motion.div>
        </div>

        {/* Bottom Legal */}
        <div className="py-8 flex justify-center gap-8 text-[10px] uppercase tracking-widest font-bold text-neutral-300 border-t border-neutral-50">
          <a href="#" className="hover:text-black transition-colors">Bảo mật</a>
          <a href="#" className="hover:text-black transition-colors">Điều khoản</a>
          <a href="#" className="hover:text-black transition-colors">Trợ giúp</a>
        </div>
      </div>
    </div>
  );
};
