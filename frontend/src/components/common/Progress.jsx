import React from 'react';
import { cn } from '../../lib/utils';

export default function Progress({
  current = 1,
  total = 4,
  label = '',
  className = ''
}) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between text-xs font-semibold text-stone-500 mb-2">
        <span className="font-mono text-stone-800 tracking-wider">
          {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        {label && <span className="font-medium text-stone-600">{label}</span>}
      </div>
      <div className="h-1.5 w-full bg-stone-200/80 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-rose-500 to-purple-500 transition-all duration-300 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
