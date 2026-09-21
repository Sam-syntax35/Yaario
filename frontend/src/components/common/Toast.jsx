import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { cn } from '../../lib/utils';

export default function Toast() {
  const { toast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />,
    error: <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />,
    info: <Info className="w-4 h-4 text-purple-600 shrink-0" />
  };

  const accentStyles = {
    success: 'border-emerald-200/90 text-stone-900',
    error: 'border-rose-200/90 text-stone-900',
    info: 'border-purple-200/90 text-stone-900'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div
        className={cn(
          'flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border shadow-lg shadow-stone-900/5',
          accentStyles[toast.type] || accentStyles.info
        )}
      >
        <div className="p-1.5 rounded-xl bg-stone-50 border border-stone-100">
          {icons[toast.type] || icons.info}
        </div>
        <p className="text-xs sm:text-sm font-medium text-stone-800 flex-1 leading-snug">
          {toast.message}
        </p>
      </div>
    </div>
  );
}
