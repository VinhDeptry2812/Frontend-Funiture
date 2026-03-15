import React, { useState } from 'react';
import { Mail, Armchair, ArrowLeft, LockKeyhole, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { authService } from '../../Service/authService';
import { useToast } from '../../contexts/ToastContext';

import { useNavigate } from 'react-router-dom';

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await authService.forgotPassword(email);
      showToast('Đã gửi email khôi phục mật khẩu. Vui lòng kiểm tra hộp thư của bạn.', 'success');
      // Thường sẽ điều hướng đến ResetPassword hoặc ở lại thông báo
    } catch (error: any) {
      const message = error.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại sau.';
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
          src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=2000" 
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
            <h3 className="text-3xl font-bold mb-4">Khám phá lại không gian của bạn</h3>
            <p className="text-neutral-200">Chúng tôi sẽ giúp bạn lấy lại quyền truy cập vào tài khoản NoiThat của mình.</p>
          </motion.div>
        </div>
      </div>

      {/* Right Side: Forgot Password Form */}
      <div className="w-full lg:w-1/2 h-screen flex flex-col bg-white relative overflow-y-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/login')}
          className="absolute top-8 left-8 z-10 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-neutral-400 hover:text-black transition-colors bg-white/80 backdrop-blur-sm p-2 rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại đăng nhập
        </button>

        <div className="flex-1 flex flex-col items-center justify-center py-24 px-8 sm:px-16 lg:px-20">
          {/* Branding */}
          <div 
            className="mb-12 flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
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
              <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <LockKeyhole className="w-8 h-8 text-black" />
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-neutral-900">Quên mật khẩu?</h2>
              <p className="text-neutral-500 mt-3 leading-relaxed">
                Đừng lo lắng, chuyện này vẫn thường xảy ra. Vui lòng nhập địa chỉ email liên kết với tài khoản của bạn.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleForgotPassword}>
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 bg-neutral-50 border border-neutral-100 rounded-none focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none text-base"
                    placeholder="Nhập email của bạn"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-black text-white font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                Gửi liên kết đặt lại
              </button>
            </form>

            <div className="mt-12 text-center text-neutral-500 text-sm">
              Nhớ lại mật khẩu? 
              <button 
                onClick={() => navigate('/login')}
                className="text-black font-bold uppercase tracking-widest hover:underline underline-offset-4 ml-2"
              >
                Đăng nhập
              </button>
            </div>
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
