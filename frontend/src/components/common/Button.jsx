import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  className = '',
  onClick,
  icon: Icon,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500/50 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] select-none cursor-pointer';

  const variants = {
    primary: 'bg-rose-500 hover:bg-rose-600 text-white shadow-sm shadow-rose-500/20 border border-rose-500',
    secondary: 'bg-stone-900 hover:bg-stone-800 text-white shadow-sm border border-stone-900',
    outline: 'bg-white hover:bg-stone-50 text-stone-800 border border-stone-200/90 shadow-2xs',
    ghost: 'bg-transparent hover:bg-stone-100/70 text-stone-600 hover:text-stone-900',
    soft: 'bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-100',
    success: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5 rounded-xl',
    md: 'text-sm px-4 py-2.5 gap-2 rounded-xl',
    lg: 'text-base px-6 py-3 gap-2.5 rounded-2xl font-semibold'
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={cn(baseStyles, variants[variant] || variants.primary, sizes[size] || sizes.md, className)}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-current" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4 shrink-0" />}
          {children}
        </>
      )}
    </button>
  );
}
