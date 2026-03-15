import React from 'react';
import { Armchair, Facebook, Instagram, Twitter } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-neutral-50 pt-24 pb-12 border-t border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
          <div className="col-span-2 lg:col-span-2">
            <button onClick={() => navigate('/')} className="flex items-center gap-2 mb-6">
              <Armchair className="h-6 w-6 text-black" />
              <span className="text-xl font-bold tracking-tighter uppercase">NoiThat</span>
            </button>
            <p className="text-sm text-neutral-500 max-w-xs leading-relaxed mb-8">
              Mang phong cách sống tối giản và hiện đại vào từng ngôi nhà Việt với những sản phẩm chất lượng quốc tế.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, idx) => (
                <a key={idx} href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-black text-white hover:bg-neutral-800 transition-colors">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-bold text-sm uppercase tracking-widest mb-6">Cửa hàng</h5>
            <ul className="space-y-4 text-sm text-neutral-500">
              {['Sản phẩm mới', 'Sofa & Armchair', 'Bàn & Ghế ăn', 'Phòng ngủ', 'Đồ trang trí'].map(item => (
                <li key={item}><button onClick={() => navigate('/products')} className="hover:text-black transition-colors">{item}</button></li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-sm uppercase tracking-widest mb-6">Hỗ trợ</h5>
            <ul className="space-y-4 text-sm text-neutral-500">
              {['Theo dõi đơn hàng', 'Chính sách bảo hành', 'Chính sách đổi trả', 'Vận chuyển & Lắp đặt', 'Câu hỏi thường gặp'].map(item => (
                <li key={item}><a href="#" className="hover:text-black transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-sm uppercase tracking-widest mb-6">Công ty</h5>
            <ul className="space-y-4 text-sm text-neutral-500">
              <li><button onClick={() => navigate('/about')} className="hover:text-black transition-colors">Về NoiThat</button></li>
              <li><button onClick={() => navigate('/')} className="hover:text-black transition-colors">Tuyển dụng</button></li>
              <li><button onClick={() => navigate('/contact')} className="hover:text-black transition-colors">Liên hệ</button></li>
              <li><button onClick={() => navigate('/')} className="hover:text-black transition-colors">Showroom</button></li>
              <li><button onClick={() => navigate('/')} className="hover:text-black transition-colors">Tin tức</button></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-neutral-400">© 2026 NoiThat. Tất cả quyền được bảo lưu.</p>
          <div className="flex gap-8 text-xs text-neutral-400">
            <a href="#" className="hover:text-black">Điều khoản dịch vụ</a>
            <a href="#" className="hover:text-black">Chính sách bảo mật</a>
            <button 
              onClick={() => navigate('/admin/login')}
              className="hover:text-black transition-colors opacity-50 hover:opacity-100"
            >
              Quản trị viên
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
