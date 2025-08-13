'use client';

import { cn } from '@/lib/utils';
import { createContext, useContext } from 'react';

const CardContext = createContext();

function Card({ children, className, ...props }) {
  return (
    <CardContext.Provider value={{}}>
      <div
        className={cn(
          'bg-white dark:bg-gray-800 rounded-lg shadow-md',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </CardContext.Provider>
  );
}

function CardHeader({ children, className }) {
  return (
    <div className={cn('p-4 border-b dark:border-gray-700', className)}>
      {children}
    </div>
  );
}

function CardContent({ children, className }) {
  return <div className={cn('p-4', className)}>{children}</div>;
}

function CardFooter({ children, className }) {
  return (
    <div className={cn('p-4 border-t dark:border-gray-700', className)}>
      {children}
    </div>
  );
}

export { Card, CardHeader, CardContent, CardFooter };