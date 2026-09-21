import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Chip({
  label,
  selected = false,
  onClick,
  disabled = false,
  className = ''
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'group inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium transition-all duration-150 select-none cursor-pointer border',
        selected
          ? 'bg-rose-500 text-white border-rose-500 shadow-sm shadow-rose-500/20 font-semibold'
          : 'bg-white hover:bg-stone-50 text-stone-700 hover:text-stone-900 border-stone-200 shadow-2xs',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <span
        className={cn(
          'w-3.5 h-3.5 rounded-full flex items-center justify-center transition-colors',
          selected ? 'bg-white/25 text-white' : 'bg-stone-100 group-hover:bg-stone-200'
        )}
      >
        {selected ? (
          <Check className="w-2.5 h-2.5 stroke-[3]" />
        ) : (
          <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
        )}
      </span>
      <span>{label}</span>
    </button>
  );
}
