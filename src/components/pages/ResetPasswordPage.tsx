import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Armchair, ArrowLeft, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { authService } from '../../Service/authService';
import { useToast } from '../../contexts/ToastContext';

interface ResetPasswordPageProps {
  onNavigate: (view: 'home' | 'products' | 'detail' | 'cart' | 'login' | 'register' | 'forgot-password' | 'reset-password' | 'admin-login' | 'profile') => void;
}

export const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ onNavigate }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState(''); // Trong thực tế token lấy từ URL
  const [email, setEmail] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showToast('Mật khẩu xác nhận không khớp', 'error');
      return;
    }

    setIsLoading(true);
    try {
      await authService.resetPassword({
        email,
        token,
        password,
        password_confirmation: confirmPassword
      });
      showToast('Đặt lại mật khẩu thành công! Vui lòng đăng nhập lại.', 'success');
      setTimeout(() => onNavigate('login'), 2000);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.';
      showToast(message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-white text-neutral-900 overflow-hidden">
      {/* Left Side: Aesthetic Image */}
      <div className="relative hidden lg:block lg:w-1/2 h-screen">
        <img 
          src="https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80&w=2000" 
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
            <h3 className="text-3xl font-bold mb-4">Bảo mật là ưu tiên hàng đầu</h3>
            <p className="text-neutral-200">Đặt lại mật khẩu mạnh mẽ để bảo vệ những lựa chọn tinh tế của bạn tại NoiThat.</p>
          </motion.div>
        </div>
      </div>

      {/* Right Side: Reset Password Form */}
      <div className="w-full lg:w-1/2 h-screen flex flex-col bg-white relative overflow-y-auto">
        {/* Back Button */}
        <button 
          onClick={() => onNavigate('login')}
          className="absolute top-8 left-8 z-10 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-neutral-400 hover:text-black transition-colors bg-white/80 backdrop-blur-sm p-2 rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại đăng nhập
        </button>

        <div className="flex-1 flex flex-col items-center justify-center py-24 px-8 sm:px-16 lg:px-20">
          {/* Branding */}
          <div 
            className="mb-8 flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <Armchair className="h-10 w-10 text-black" />
            <h1 className="text-2xl font-bold tracking-tighter uppercase text-center">NoiThat</h1>
          </div>

          {/* Container */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-[400px]"
          >
            <div className="mb-10 text-center">
              <h2 className="text-4xl font-bold tracking-tight text-neutral-900">Đặt lại mật khẩu</h2>
              <p className="text-neutral-500 mt-3 leading-relaxed">
                Vui lòng nhập mã xác nhận và mật khẩu mới của bạn.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleResetPassword}>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Email</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-14 px-4 bg-neutral-50 border border-neutral-100 rounded-none focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none text-base"
                  placeholder="Nhập email của bạn"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Mã xác nhận (Token)</label>
                <input 
                  type="text" 
                  required
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="w-full h-14 px-4 bg-neutral-50 border border-neutral-100 rounded-none focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none text-base"
                  placeholder="Nhập mã từ email"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Mật khẩu mới</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input 
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-14 pl-12 pr-12 bg-neutral-50 border border-neutral-100 rounded-none focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none text-base"
                    placeholder="Tối thiểu 8 ký tự"
                  />
                  <button 
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Xác nhận mật khẩu</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input 
                    type={showPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full h-14 pl-12 pr-12 bg-neutral-50 border border-neutral-100 rounded-none focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none text-base"
                    placeholder="Nhập lại mật khẩu mới"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-black text-white font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                Lưu mật khẩu mới
              </button>
            </form>
          </motion.div>
        </div>

        <div className="py-8 flex justify-center gap-8 text-[10px] uppercase tracking-widest font-bold text-neutral-300 border-t border-neutral-50">
          <button className="hover:text-black transition-colors">Bảo mật</button>
          <button className="hover:text-black transition-colors">Điều khoản</button>
          <button className="hover:text-black transition-colors">Trợ giúp</button>
        </div>
      </div>
    </div>
  );
};
