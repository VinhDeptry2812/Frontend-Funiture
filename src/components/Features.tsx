import React from 'react';
import { Sofa, CheckCircle2, Truck, ShieldCheck } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    { icon: Sofa, title: 'Thiết kế tối giản', desc: 'Tôn vinh vẻ đẹp của sự đơn giản và công năng trong từng đường nét.' },
    { icon: CheckCircle2, title: 'Chất liệu cao cấp', desc: 'Sử dụng gỗ tự nhiên, vải sợi hữu cơ và vật liệu bền vững.' },
    { icon: Truck, title: 'Giao hàng toàn quốc', desc: 'Dịch vụ vận chuyển chuyên nghiệp và đóng gói cẩn thận.' },
    { icon: ShieldCheck, title: 'Bảo hành 2 năm', desc: 'An tâm sử dụng với chính sách bảo hành dài hạn từ chúng tôi.' },
  ];

  return (
    <section className="py-24 border-b border-neutral-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
                <feature.icon className="h-8 w-8 text-black" />
              </div>
              <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
              <p className="text-sm text-neutral-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
