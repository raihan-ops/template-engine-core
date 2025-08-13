'use client';
import { cn } from '@/lib/utils';

export function RadioGroup({ value, onChange, options, className }) {
  return (
    <div className={cn('space-y-2', className)}>
      {options.map((option) => (
        <label key={option.value} className="flex items-center space-x-2">
          <input
            type="radio"
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="h-4 w-4"
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
}