/* eslint-disable react/prop-types */
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-indigo-300',
  {
    variants: {
      variant: {
        default: 'bg-indigo-900 text-indigo-50 shadow hover:bg-indigo-900/90 dark:bg-indigo-50 dark:text-indigo-900 dark:hover:bg-indigo-50/90',
        destructive: 'bg-red-500 text-indigo-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-indigo-50 dark:hover:bg-red-900/90',
        outline:
          'border border-indigo-200 bg-white shadow-sm hover:bg-indigo-100 hover:text-indigo-900 dark:border-indigo-800 dark:bg-indigo-950 dark:hover:bg-indigo-800 dark:hover:text-indigo-50',
        secondary: 'bg-indigo-100 text-indigo-900 shadow-sm hover:bg-indigo-100/80 dark:bg-indigo-800 dark:text-indigo-50 dark:hover:bg-indigo-800/80',
        ghost: 'hover:bg-indigo-100 hover:text-indigo-900 dark:hover:bg-indigo-800 dark:hover:text-indigo-50',
        link: 'text-indigo-900 underline-offset-4 hover:underline dark:text-indigo-50',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = 'Button';

export { Button, buttonVariants };
