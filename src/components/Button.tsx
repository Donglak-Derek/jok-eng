import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

type ButtonVariant = 
  | "primary" 
  | "secondary" 
  | "outline" 
  | "ghost" 
  | "danger"
  | "glass"; // For that spotlight feel

type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className = "", 
    variant = "primary", 
    size = "md", 
    isLoading = false,
    children, 
    leftIcon,
    rightIcon,
    disabled,
    ...props 
  }, ref) => {
    
    // Base styles
    const baseStyles = "relative inline-flex items-center justify-center font-bold uppercase tracking-wider rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:active:scale-100 outline-none active:scale-[0.98]";
    
    // Sizes (Heights fixed to 8pt grid)
    // sm: 32px (h-8), md: 40px (h-10), lg: 48px (h-12), xl: 56px (h-14)
    const sizeStyles = {
      sm: "h-4 px-4 text-xs gap-1",
      md: "h-10 px-5 text-sm gap-2",   
      lg: "h-12 px-6 text-base gap-2.5",
      xl: "h-14 px-8 text-lg gap-3"
    };

    // Variants
    const variantStyles = {
      primary: "bg-black text-white border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
      secondary: "bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary/20 hover:border-secondary/50",
      outline: "bg-transparent border border-primary/30 text-primary hover:bg-primary/5 hover:border-primary shadow-[0_0_15px_rgba(34,211,238,0.1)]",
      ghost: "bg-transparent text-muted hover:text-foreground hover:bg-white/5",
      danger: "bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500/20 hover:border-red-500",
      glass: "backdrop-blur-md bg-white/5 border border-white/10 text-foreground hover:bg-white/10 hover:border-white/20 shadow-lg"
    };

    return (
      <motion.button
        ref={ref}
        type={props.type || "button"} // Default to button to avoid accidental submits, unless specified
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        disabled={disabled || isLoading}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {!isLoading && leftIcon}
        {children}
        {!isLoading && rightIcon}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
