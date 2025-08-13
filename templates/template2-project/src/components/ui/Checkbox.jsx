'use client';

import { cn } from "@/lib/utils";


export function Checkbox({ label, className, ...props }) {
  return (
    <label className={cn('flex items-center space-x-2', className)}>
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300 dark:border-gray-600"
        {...props}
      />
      <span>{label}</span>
    </label>
  );
}