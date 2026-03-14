import React from 'react';
import { Mail, Phone, MapPin, Clock, Send, Globe, Share2, Camera } from 'lucide-react';
import { motion } from 'motion/react';

interface ContactPageProps {
  onNavigate: (view: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24 text-center px-4 bg-neutral-50">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-[48px] font-bold text-neutral-900 mb-4 tracking-tighter"
        >
          Liên hệ với chúng tôi
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-neutral-500 max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
        >
          Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn trong việc kiến tạo không gian sống mơ ước. Hãy để lại lời nhắn cho NoiThat.
        </motion.p>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side: Info & Map */}
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold mb-8 tracking-tight">Thông tin liên hệ</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-neutral-100 flex items-center justify-center rounded-xl">
                    <MapPin className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900">Địa chỉ</h3>
                    <p className="text-neutral-500 text-sm mt-1 leading-relaxed">
                      123 Đường ABC, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh, Việt Nam
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-neutral-100 flex items-center justify-center rounded-xl">
                    <Phone className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900">Điện thoại</h3>
                    <p className="text-neutral-500 text-sm mt-1 leading-relaxed">
                      +84 (28) 1234 5678<br />
                      Hotline: 1900 0000
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-neutral-100 flex items-center justify-center rounded-xl">
                    <Mail className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900">Email</h3>
                    <p className="text-neutral-500 text-sm mt-1 leading-relaxed">
                      hello@noithat.vn<br />
                      support@noithat.vn
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-neutral-100 flex items-center justify-center rounded-xl">
                    <Clock className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900">Giờ làm việc</h3>
                    <p className="text-neutral-500 text-sm mt-1 leading-relaxed">
                      Thứ 2 - Thứ 7: 09:00 - 20:00<br />
                      Chủ nhật: 10:00 - 18:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Grayscale Map Placeholder */}
            <div className="w-full aspect-video bg-neutral-100 rounded-2xl overflow-hidden grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500 border border-neutral-200">
              <img 
                src="https://picsum.photos/seed/map/800/450?grayscale" 
                alt="Map" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Right Side: Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-neutral-100 p-8 md:p-12 rounded-3xl shadow-sm"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Họ và tên</label>
                  <input 
                    type="text" 
                    placeholder="Nguyễn Văn A"
                    className="w-full px-4 py-3 bg-neutral-50 border-none rounded-xl focus:ring-1 focus:ring-black placeholder:text-neutral-300 text-sm"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Email</label>
                  <input 
                    type="email" 
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 bg-neutral-50 border-none rounded-xl focus:ring-1 focus:ring-black placeholder:text-neutral-300 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Số điện thoại</label>
                  <input 
                    type="tel" 
                    placeholder="090 123 4567"
                    className="w-full px-4 py-3 bg-neutral-50 border-none rounded-xl focus:ring-1 focus:ring-black placeholder:text-neutral-300 text-sm"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Chủ đề</label>
                  <select className="w-full px-4 py-3 bg-neutral-50 border-none rounded-xl focus:ring-1 focus:ring-black text-neutral-500 text-sm">
                    <option>Tư vấn thiết kế</option>
                    <option>Hỗ trợ đơn hàng</option>
                    <option>Hợp tác kinh doanh</option>
                    <option>Khác</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Nội dung tin nhắn</label>
                <textarea 
                  placeholder="Bạn đang quan tâm đến sản phẩm nào?"
                  rows={5}
                  className="w-full px-4 py-3 bg-neutral-50 border-none rounded-xl focus:ring-1 focus:ring-black placeholder:text-neutral-300 text-sm resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-black text-white font-bold rounded-xl hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Gửi tin nhắn</span>
                <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
