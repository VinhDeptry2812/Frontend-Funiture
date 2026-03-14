import React, { useEffect } from 'react';
import { Facebook } from 'lucide-react';
import { authService } from '../../../Service/authService';
import { useToast } from '../../../contexts/ToastContext';

interface SocialLoginProps {
  onSuccess: (token: string, user: any, message: string) => void;
}

export const SocialLogin: React.FC<SocialLoginProps> = ({ onSuccess }) => {
  const { showToast } = useToast();

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    const url = authService.getSocialLoginUrl(provider);
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    
    window.open(
      url,
      `Login with ${provider}`,
      `width=${width},height=${height},left=${left},top=${top},status=no,resizable=no,toolbar=no,menubar=no,scrollbars=yes`
    );
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { token, user, error } = event.data;
      if (token) {
        onSuccess(token, user, 'Đăng nhập mạng xã hội thành công');
      } else if (error) {
        showToast('Đăng nhập mạng xã hội thất bại', 'error');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onSuccess, showToast]);

  return (
    <>
      <div className="relative my-10">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-neutral-100"></div>
        </div>
        <div className="relative flex justify-center text-xs font-bold uppercase tracking-widest">
          <span className="bg-white px-4 text-neutral-400">Hoặc tiếp tục với</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button 
          type="button"
          onClick={() => handleSocialLogin('google')}
          className="flex items-center justify-center gap-3 h-14 border border-neutral-100 hover:bg-neutral-50 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z" fill="#FBBC05"></path>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"></path>
          </svg>
          <span className="text-xs font-bold uppercase tracking-widest">Google</span>
        </button>
        <button 
          type="button"
          onClick={() => handleSocialLogin('facebook')}
          className="flex items-center justify-center gap-3 h-14 border border-neutral-100 hover:bg-neutral-50 transition-colors"
        >
          <Facebook className="w-5 h-5 text-[#1877F2] fill-current" />
          <span className="text-xs font-bold uppercase tracking-widest">Facebook</span>
        </button>
      </div>
    </>
  );
};
