import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}

export const Card = ({ children, className, padded = true }: CardProps) => (
  <div
    className={cn(
      "rounded-2xl border border-white/10 bg-white/80 p-px shadow-lg shadow-black/5 backdrop-blur",
      className,
    )}
  >
    <div className={cn("h-full w-full rounded-[calc(1rem-2px)] bg-white", padded && "p-6")}>
      {children}
    </div>
  </div>
);
