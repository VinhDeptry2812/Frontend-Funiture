import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Armchair, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { authService } from '../../Service/authService';
import { useToast } from '../../contexts/ToastContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { SocialLogin } from '../features/auth/SocialLogin';

interface RegisterPageProps {
  onNavigate: (view: 'home' | 'products' | 'detail' | 'cart' | 'login' | 'register' | 'forgot-password' | 'reset-password' | 'admin-login' | 'profile') => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      showToast('Mật khẩu xác nhận không khớp', 'error');
      return;
    }

    setIsLoading(true);
    try {
      await authService.register({
        name,
        email,
        password,
        password_confirmation: confirmPassword
      });
      
      showToast('Đăng ký tài khoản thành công! Vui lòng đăng nhập.', 'success');
      setTimeout(() => onNavigate('login'), 2000);
    } catch (err: any) {
      const message = err.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.';
      setError(message);
      showToast(message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSuccess = (token: string, user: any, message: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    showToast(message, 'success');
    setTimeout(() => onNavigate('home'), 1500);
  };

  return (
    <div className="flex min-h-screen w-full bg-white text-neutral-900 overflow-hidden">
      {/* Left Side: Aesthetic Image */}
      <div className="relative hidden lg:block lg:w-1/2 h-screen">
        <img 
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=2000" 
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
            <h3 className="text-3xl font-bold mb-4">Tham gia cộng đồng NoiThat</h3>
            <p className="text-neutral-200">Đăng ký ngay để nhận được những gợi ý trang trí không gian sống từ các chuyên gia hàng đầu.</p>
          </motion.div>
        </div>
      </div>

      {/* Right Side: Register Form */}
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
            className="mb-8 flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <Armchair className="h-10 w-10 text-black" />
            <h1 className="text-2xl font-bold tracking-tighter uppercase text-center">NoiThat</h1>
          </div>

          {/* Register Container */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-[400px]"
          >
            <div className="mb-8 text-center">
              <h2 className="text-4xl font-bold tracking-tight text-neutral-900">Đăng ký</h2>
              <p className="text-neutral-500 mt-3">Bắt đầu hành trình kiến tạo tổ ấm của bạn.</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm border-l-4 border-red-600">
                {error}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleRegister}>
              <Input 
                label="Họ và tên"
                placeholder="Nguyễn Văn A"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                leftIcon={<User className="w-5 h-5" />}
              />

              <Input 
                label="Email"
                type="email"
                placeholder="name@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-5 h-5" />}
              />

              <Input 
                label="Mật khẩu"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock className="w-5 h-5" />}
                rightIcon={
                  <button type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                }
              />

              <Input 
                label="Xác nhận mật khẩu"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                leftIcon={<Lock className="w-5 h-5" />}
              />

              <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" required className="mt-1 rounded-none border-neutral-300 text-black focus:ring-black h-5 w-5" />
                <span className="text-sm text-neutral-500 leading-relaxed">
                  Tôi đồng ý với các <button type="button" className="text-black font-bold hover:underline underline-offset-4">Điều khoản dịch vụ</button> và <button type="button" className="text-black font-bold hover:underline underline-offset-4">Chính sách bảo mật</button>.
                </span>
              </label>

              <Button 
                type="submit"
                isLoading={isLoading}
                fullWidth
                size="xl"
              >
                Đăng ký tài khoản
              </Button>
            </form>

            <SocialLogin onSuccess={handleSocialSuccess} />

            <p className="mt-10 text-center text-neutral-500 text-sm">
              Đã có tài khoản? 
              <button 
                onClick={() => onNavigate('login')}
                className="text-black font-bold uppercase tracking-widest hover:underline underline-offset-4 ml-2"
              >
                Đăng nhập ngay
              </button>
            </p>
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
