import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Armchair, ArrowLeft, ShieldCheck, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { authService } from '../../Service/authService';
import { useToast } from '../../contexts/ToastContext';

interface AdminLoginPageProps {
  onNavigate: (view: 'home' | 'products' | 'detail' | 'cart' | 'login' | 'register' | 'forgot-password' | 'reset-password' | 'admin-login' | 'profile') => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onNavigate }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password });
      
      // Giả sử có logic kiểm tra role admin ở đây
      if (response.user.role !== 'admin' && response.user.role !== 'staff') {
        showToast('Tài khoản không có quyền truy cập quản trị', 'error');
        setIsLoading(false);
        return;
      }

      localStorage.setItem('token', response.access_token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      showToast('Xác thực quản trị viên thành công. Đang chuyển hướng...', 'success');
      setTimeout(() => onNavigate('home'), 1500); // Hoặc navigate tới trang admin dashboard nếu có
    } catch (error: any) {
      const message = error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại.';
      showToast(message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-white text-neutral-900 overflow-hidden">
      {/* Left Side: Professional Architectural Image */}
      <div className="relative hidden lg:block lg:w-1/2 h-screen">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
          alt="Admin Portal" 
          className="absolute inset-0 h-full w-full object-cover grayscale contrast-125 brightness-75"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-12 left-12 text-white max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-8 h-8 text-white" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-300">Hệ thống quản trị</span>
            </div>
            <h3 className="text-4xl font-bold mb-4 tracking-tight">Quản lý không gian, kiến tạo giá trị.</h3>
            <p className="text-neutral-300 leading-relaxed">Truy cập vào bảng điều khiển trung tâm để quản lý sản phẩm, đơn hàng và tối ưu hóa trải nghiệm khách hàng.</p>
          </motion.div>
        </div>
      </div>

      {/* Right Side: Admin Login Form */}
      <div className="w-full lg:w-1/2 h-screen flex flex-col bg-white relative overflow-y-auto">
        {/* Back Button */}
        <button 
          onClick={() => onNavigate('home')}
          className="absolute top-8 left-8 z-10 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-neutral-400 hover:text-black transition-colors bg-white/80 backdrop-blur-sm p-2 rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại trang chủ
        </button>

        <div className="flex-1 flex flex-col items-center justify-center py-24 px-8 sm:px-16 lg:px-20">
          {/* Branding */}
          <div 
            className="mb-12 flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <Armchair className="h-10 w-10 text-black" />
            <h1 className="text-2xl font-bold tracking-tighter uppercase text-center">NoiThat</h1>
          </div>

          {/* Login Container */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-[400px]"
          >
            <div className="mb-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-50 mb-6">
                <ShieldCheck className="w-8 h-8 text-black" />
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-neutral-900">Admin Portal</h2>
              <p className="text-neutral-500 mt-3 font-medium">Vui lòng đăng nhập để tiếp tục quản trị hệ thống.</p>
            </div>

            <form className="space-y-6" onSubmit={handleAdminLogin}>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Mã quản trị viên / Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 bg-neutral-50 border border-neutral-100 rounded-none focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none text-base font-medium"
                    placeholder="admin@noithat.vn"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Mật khẩu bảo mật</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input 
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-14 pl-12 pr-12 bg-neutral-50 border border-neutral-100 rounded-none focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none text-base"
                    placeholder="••••••••"
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

              <div className="p-4 bg-neutral-50 border border-neutral-100 flex gap-3 items-start">
                <div className="w-1 h-full bg-black shrink-0" />
                <p className="text-[11px] text-neutral-500 leading-relaxed uppercase font-bold tracking-wider">
                  Lưu ý: Mọi hoạt động truy cập trái phép vào hệ thống quản trị sẽ bị ghi lại và xử lý theo quy định bảo mật của công ty.
                </p>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-black text-white font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
              >
                {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                Xác thực & Truy cập
              </button>
            </form>

            <div className="mt-12 text-center">
              <button 
                onClick={() => onNavigate('login')}
                className="text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-black transition-colors"
              >
                Bạn là khách hàng? Đăng nhập tại đây
              </button>
            </div>
          </motion.div>
        </div>

        <div className="py-8 flex justify-center gap-8 text-[10px] uppercase tracking-widest font-bold text-neutral-300 border-t border-neutral-50">
          <span>NoiThat Admin v2.1.0</span>
          <button className="hover:text-black transition-colors">Bảo mật hệ thống</button>
          <button className="hover:text-black transition-colors">Hỗ trợ kỹ thuật</button>
        </div>
      </div>
    </div>
  );
};
