import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
}

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-70";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-burgundy)] text-white hover:bg-[#7d0f0e] focus-visible:outline-[var(--color-burgundy)]",
  secondary:
    "bg-[var(--color-green)] text-white hover:bg-[#3c6a2e] focus-visible:outline-[var(--color-green)]",
  ghost:
    "border border-white/40 text-white hover:bg-white/10 focus-visible:outline-white",
};

const sizeStyles: Record<ButtonSize, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className,
  leftIcon,
  rightIcon,
  isLoading,
  disabled,
  ...props
}: ButtonProps) => (
  <button
    className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
    disabled={disabled || isLoading}
    {...props}
  >
    {leftIcon}
    <span>{isLoading ? "Please wait..." : children}</span>
    {rightIcon}
  </button>
);
