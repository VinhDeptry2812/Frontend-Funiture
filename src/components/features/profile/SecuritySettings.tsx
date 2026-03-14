import React from 'react';

export const SecuritySettings: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm border border-neutral-100">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-neutral-900 mb-1">Bảo mật</h3>
        <p className="text-sm text-neutral-500">Chúng tôi khuyên bạn nên sử dụng mật khẩu mạnh để bảo mật tài khoản.</p>
      </div>
      <button className="px-8 py-3 border-2 border-neutral-200 text-neutral-900 font-bold uppercase tracking-widest rounded-full hover:bg-neutral-50 transition-all text-xs">
        Thay đổi mật khẩu
      </button>
    </div>
  );
};
