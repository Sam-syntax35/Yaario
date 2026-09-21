import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';

export default function LoadingState({
  title = 'Finding your people...',
  subtitle = 'Please wait while we prepare the best matches for you.'
}) {
  return (
    <div className="py-16 px-4 flex flex-col items-center justify-center text-center">
      <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200/80 flex items-center justify-center text-rose-500 mb-4 shadow-sm">
        <Sparkles className="w-6 h-6 animate-spin" />
      </div>
      <h3 className="text-base font-semibold text-stone-900 mb-1">{title}</h3>
      <p className="text-xs text-stone-500 max-w-sm">{subtitle}</p>
    </div>
  );
}
