import React from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
  title = 'No matches found',
  description = 'We couldn\'t find any buddies matching these exact preferences. Try broadening your criteria or checking back soon!',
  actionLabel = 'Explore Other Profiles',
  onAction,
  icon: Icon = Sparkles
}) {
  return (
    <div className="max-w-md mx-auto py-12 px-6 rounded-3xl bg-white border border-stone-200/80 shadow-sm text-center">
      <div className="w-12 h-12 mx-auto rounded-2xl bg-stone-100 border border-stone-200 text-stone-500 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-stone-900 mb-1.5">{title}</h3>
      <p className="text-xs sm:text-sm text-stone-500 mb-6 leading-relaxed">
        {description}
      </p>
      {onAction && (
        <Button variant="primary" onClick={onAction} icon={RefreshCw}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
