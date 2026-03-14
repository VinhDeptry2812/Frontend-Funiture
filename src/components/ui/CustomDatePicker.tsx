import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface CustomDatePickerProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ value, onChange, placeholder = "Chọn ngày sinh" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'days' | 'years'>('days');

  // Khởi tạo Date từ chuỗi YYYY-MM-DD đảm bảo tính đúng múi giờ địa phương
  const parseLocalDate = (dateStr: string) => {
    if (!dateStr) return new Date();
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
  };
  
  const [viewDate, setViewDate] = useState(parseLocalDate(value));
  
  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const handleDayClick = (day: number) => {
    const year = viewDate.getFullYear();
    const month = String(viewDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const formatted = `${year}-${month}-${dayStr}`;
    onChange(formatted);
    setIsOpen(false);
  };

  const changeMonth = (offset: number) => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
  };

  const handleYearClick = (year: number) => {
    setViewDate(new Date(year, viewDate.getMonth(), 1));
    setView('days');
  };

  const renderDays = () => {
    const totalDays = daysInMonth(viewDate.getFullYear(), viewDate.getMonth());
    const firstDay = firstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth());
    const days = [];
    
    for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} className="h-10 w-10" />);
    }

    for (let d = 1; d <= totalDays; d++) {
      const dateStr = `${viewDate.getFullYear()}-${String(viewDate.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isSelected = value === dateStr;
      days.push(
        <button
          key={d}
          type="button"
          onClick={() => handleDayClick(d)}
          className={`h-10 w-10 flex items-center justify-center rounded-full text-xs font-bold transition-all
            ${isSelected ? 'bg-black text-white' : 'hover:bg-neutral-100 text-neutral-600'}`}
        >
          {d}
        </button>
      );
    }
    return days;
  };

  const renderYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let y = currentYear; y >= currentYear - 100; y--) {
      const isSelected = viewDate.getFullYear() === y;
      years.push(
        <button
          key={y}
          type="button"
          onClick={() => handleYearClick(y)}
          className={`py-2 px-4 rounded-full text-sm font-bold transition-all
            ${isSelected ? 'bg-black text-white' : 'hover:bg-neutral-100 text-neutral-600'}`}
        >
          {y}
        </button>
      );
    }
    return (
      <div className="grid grid-cols-3 gap-2 h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-neutral-200">
        {years}
      </div>
    );
  };

  const monthName = viewDate.toLocaleString('vi-VN', { month: 'long' });

  return (
    <div className="relative">
      <div 
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) setView('days');
        }}
        className="relative group cursor-pointer"
      >
        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-hover:text-black transition-colors" />
        <div className="w-full bg-neutral-50 border border-neutral-100 rounded-xl pl-12 pr-4 py-4 text-sm focus-within:ring-2 focus-within:ring-black min-h-[56px] flex items-center">
            {value ? new Date(value).toLocaleDateString('vi-VN') : <span className="text-neutral-300">{placeholder}</span>}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute left-0 top-full mt-2 w-[320px] bg-white border border-neutral-100 shadow-2xl rounded-2xl p-6 z-50 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <button type="button" onClick={() => changeMonth(-1)} className="p-2 hover:bg-neutral-50 rounded-full transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  type="button"
                  onClick={() => setView(view === 'days' ? 'years' : 'days')}
                  className="text-sm font-black uppercase tracking-widest text-black hover:bg-neutral-50 px-3 py-1 rounded-full transition-colors"
                >
                  {monthName} {viewDate.getFullYear()}
                </button>
                <button type="button" onClick={() => changeMonth(1)} className="p-2 hover:bg-neutral-50 rounded-full transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {view === 'days' ? (
                <>
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map(d => (
                      <div key={d} className="h-10 w-10 flex items-center justify-center text-[10px] font-black text-neutral-300 uppercase">
                        {d}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {renderDays()}
                  </div>
                </>
              ) : renderYears()}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
