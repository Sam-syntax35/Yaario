import React from 'react';
import { cn } from '../../lib/utils';

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  icon: Icon
}) {
  const variants = {
    default: 'bg-stone-100 text-stone-700 border-stone-200/80',
    coral: 'bg-rose-50 text-rose-700 border-rose-200/70',
    lavender: 'bg-purple-50 text-purple-700 border-purple-200/70',
    amber: 'bg-amber-50 text-amber-700 border-amber-200/70',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200/70',
    dark: 'bg-stone-900 text-stone-100 border-stone-800'
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full border tracking-normal',
        variants[variant] || variants.default,
        sizes[size] || sizes.md,
        className
      )}
    >
      {Icon && <Icon className="w-3 h-3 shrink-0" />}
      {children}
    </span>
  );
}
