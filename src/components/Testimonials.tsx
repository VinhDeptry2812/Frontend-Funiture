import React from 'react';
import { Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { testimonials } from '../constants';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-16">Khách hàng nói về chúng tôi</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative bg-neutral-50 p-10 rounded-2xl"
            >
              <Quote className="absolute top-6 left-6 h-12 w-12 text-black/5" />
              <p className="relative z-10 italic text-neutral-600 mb-8 leading-relaxed">
                "{t.content}"
              </p>
              <div>
                <p className="font-bold text-black">- {t.author}</p>
                <p className="text-xs text-neutral-400 mt-1">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
