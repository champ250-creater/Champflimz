// @ts-nocheck
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-[var(--duration-fast)] ease-[var(--ease-move)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 disabled:pointer-events-none disabled:opacity-50 min-h-[44px]",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-accent-500)] text-[#121110] hover:bg-[var(--color-accent-600)] hover:-translate-y-[1px] hover:shadow-[var(--shadow-raised)] active:translate-y-[0px] active:shadow-[var(--shadow-flat)]",
        destructive: "bg-[var(--color-danger)] text-white hover:opacity-90",
        outline: "border border-[var(--color-surface-4)] bg-transparent hover:bg-[var(--color-surface-2)] text-[var(--foreground)]",
        secondary: "bg-[var(--color-surface-2)] text-[var(--foreground)] hover:bg-[var(--color-surface-3)]",
        ghost: "hover:bg-[var(--color-surface-2)] text-[var(--foreground)]",
        link: "text-[var(--color-accent-500)] underline-offset-4 hover:underline",
        glass: "glass-panel hover:bg-[color-mix(in_srgb,var(--color-surface-1)_80%,transparent)]"
      },
      size: {
        default: "h-[44px] px-6 py-2",
        sm: "h-9 rounded-md px-4",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-[44px] w-[44px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants, cn };
