'use client';
import { Listbox } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Select({ options, onChange, defaultValue, className }) {
  return (
    <Listbox onChange={onChange} defaultValue={defaultValue}>
      <div className="relative">
        <Listbox.Button
          className={cn(
            'px-4 py-2 border rounded-md flex items-center justify-between w-48',
            className
          )}
        >
          {({ value }) => (
            <>
              <span>{options.find(opt => opt.value === value)?.label}</span>
              <ChevronDown className="w-4 h-4" />
            </>
          )}
        </Listbox.Button>
        <Listbox.Options className="absolute mt-1 border rounded-md bg-white dark:bg-gray-800 w-48">
          {options.map((option) => (
            <Listbox.Option
              key={option.value}
              value={option.value}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              {option.label}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}