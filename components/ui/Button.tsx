import React, { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'ghost' | 'link' | 'default' | 'secondary' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'icon' | 'default';
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  variant = 'default',
  size = 'default',
  isLoading,
  children,
  disabled,
  ...props
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-bold uppercase tracking-widest transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap";
  
  const variants = {
    default: "bg-brand-black text-brand-white hover:bg-brand-gold border border-brand-black hover:border-brand-gold",
    solid: "bg-brand-black text-brand-white hover:bg-brand-gold border border-brand-black hover:border-brand-gold",
    outline: "bg-transparent text-brand-black border border-brand-black/20 hover:border-brand-gold hover:text-brand-gold",
    ghost: "bg-transparent text-brand-black hover:bg-brand-black/5",
    link: "bg-transparent text-brand-black underline-offset-4 hover:underline hover:text-brand-gold",
    secondary: "bg-brand-cream text-brand-black hover:bg-brand-black hover:text-brand-white",
    destructive: "bg-red-500 text-white hover:bg-red-600",
  };

  const sizes = {
    default: "h-12 px-8 text-xs",
    sm: "h-10 px-6 text-[10px]",
    md: "h-12 px-8 text-xs",
    lg: "h-14 px-10 text-sm",
    icon: "h-12 w-12",
  };

  const selectedVariant = variants[variant as keyof typeof variants] || variants.default;
  const selectedSize = sizes[size as keyof typeof sizes] || sizes.default;

  return (
    <button
      ref={ref}
      className={cn(baseStyles, selectedVariant, selectedSize, className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {children}
    </button>
  );
});

Button.displayName = "Button";

export { Button };
export default Button;
