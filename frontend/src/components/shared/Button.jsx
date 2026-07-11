import React from 'react';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  id,
}) => {
  const baseStyle = 'inline-flex items-center justify-center font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary: 'bg-academic-maroon text-white hover:bg-[#600010] active:bg-[#50000a] focus:ring-academic-maroon',
    secondary: 'bg-academic-navy text-white hover:bg-[#0a1f3f] active:bg-[#051329] focus:ring-academic-navy',
    outline: 'border border-academic-navy text-academic-navy hover:bg-[#0f2c59]/5 active:bg-[#0f2c59]/10 focus:ring-academic-navy',
    accent: 'bg-academic-gold text-academic-slate hover:bg-[#c39b2e] active:bg-[#b08b26] focus:ring-academic-gold',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500',
    ghost: 'text-academic-navy hover:bg-academic-navy/5 focus:ring-academic-navy',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled || variant === 'disabled'}
      className={`
        ${baseStyle}
        ${variants[disabled ? 'outline' : variant]}
        ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
