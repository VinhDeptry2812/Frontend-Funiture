import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = true,
  className = '',
  leftIcon,
  rightIcon,
  ...props
}) => {
  const widthStyle = fullWidth ? 'w-full' : '';
  
  return (
    <div className={`space-y-2 ${widthStyle}`}>
      {label && (
        <label className="text-sm font-bold text-neutral-700 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
            {leftIcon}
          </div>
        )}
        <input
          className={`bg-neutral-50 border-neutral-200 rounded-xl px-4 py-4 text-sm focus:ring-2 focus:ring-black focus:bg-white transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
            leftIcon ? 'pl-12' : ''
          } ${rightIcon ? 'pr-12' : ''} ${widthStyle} ${className} outline-none`}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};
