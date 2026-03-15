import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Heart, Shield, Sparkles, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white">
      {/* Hero Section - Editorial Style */}
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-neutral-900">
        <div className="absolute inset-0 opacity-60">
          <img 
            src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80" 
            alt="Modern Interior" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-white/70 mb-6">
              Câu chuyện của chúng tôi
            </span>
            <h1 className="text-5xl md:text-8xl font-bold text-white leading-[0.9] tracking-tighter mb-8">
              KIẾN TẠO <br />
              <span className="text-neutral-400">KHÔNG GIAN</span> <br />
              SỐNG LÝ TƯỞNG
            </h1>
            <p className="text-lg text-white/80 max-w-lg leading-relaxed mb-10">
              NoiThat không chỉ bán nội thất, chúng tôi mang đến những giải pháp sống tinh tế, hiện đại và đầy cảm hứng cho ngôi nhà của bạn.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section - Clean & Minimal */}
      <section className="py-24 border-b border-neutral-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-8">Tầm nhìn & Sứ mệnh</h2>
              <p className="text-neutral-500 leading-relaxed mb-6">
                Tại NoiThat, chúng tôi tin rằng mỗi món đồ nội thất đều có linh hồn và kể một câu chuyện riêng. Sứ mệnh của chúng tôi là kết nối những giá trị thẩm mỹ quốc tế với phong cách sống đặc trưng của người Việt.
              </p>
              <p className="text-neutral-500 leading-relaxed">
                Chúng tôi không ngừng tìm kiếm và sáng tạo những thiết kế tối giản nhưng đầy công năng, sử dụng vật liệu bền vững để bảo vệ môi trường và sức khỏe người dùng.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <img 
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80" 
                  alt="Furniture Detail" 
                  className="rounded-2xl w-full aspect-[3/4] object-cover"
                  referrerPolicy="no-referrer"
                />
                <img 
                  src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80" 
                  alt="Modern Chair" 
                  className="rounded-2xl w-full aspect-square object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-4">
                <img 
                  src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80" 
                  alt="Living Room" 
                  className="rounded-2xl w-full aspect-square object-cover"
                  referrerPolicy="no-referrer"
                />
                <img 
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80" 
                  alt="Minimalist Decor" 
                  className="rounded-2xl w-full aspect-[3/4] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Grid Layout */}
      <section className="py-24 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Giá trị cốt lõi</h2>
            <p className="text-neutral-500">Những nguyên tắc định hình nên thương hiệu NoiThat ngày hôm nay.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Sparkles, title: "Thiết kế tinh xảo", desc: "Mỗi sản phẩm là một tác phẩm nghệ thuật được chăm chút tỉ mỉ." },
              { icon: Shield, title: "Chất lượng bền bỉ", desc: "Sử dụng vật liệu cao cấp, đảm bảo tuổi thọ lâu dài cho sản phẩm." },
              { icon: Heart, title: "Tận tâm phục vụ", desc: "Trải nghiệm khách hàng luôn là ưu tiên hàng đầu của chúng tôi." },
              { icon: Globe, title: "Bền vững", desc: "Cam kết sử dụng nguồn nguyên liệu thân thiện với môi trường." }
            ].map((value, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-neutral-100 hover:shadow-xl hover:shadow-neutral-200/50 transition-all duration-300">
                <div className="h-12 w-12 bg-neutral-900 text-white rounded-xl flex items-center justify-center mb-6">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold mb-3">{value.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Clean Utility Style */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "Năm kinh nghiệm", value: "10+" },
              { label: "Dự án hoàn thành", value: "2.5k" },
              { label: "Khách hàng hài lòng", value: "15k" },
              { label: "Showroom toàn quốc", value: "12" }
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-5xl font-bold tracking-tighter mb-2">{stat.value}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-neutral-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-neutral-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-l from-neutral-900 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80" 
            alt="CTA Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8 leading-tight">
              Sẵn sàng để làm mới <br /> không gian của bạn?
            </h2>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => navigate('/products')}
                className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-neutral-200 transition-colors flex items-center gap-2"
              >
                Khám phá bộ sưu tập <ArrowRight className="h-4 w-4" />
              </button>
              <button 
                onClick={() => navigate('/contact')}
                className="border border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors"
              >
                Liên hệ tư vấn
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
