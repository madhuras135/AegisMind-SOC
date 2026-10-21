import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Button = React.forwardRef(({ className, variant = 'default', size = 'default', ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:opacity-50 disabled:pointer-events-none ring-offset-slate-900";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    destructive: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-slate-700 hover:bg-slate-800 text-slate-100",
    secondary: "bg-slate-800 text-slate-100 hover:bg-slate-700",
    ghost: "hover:bg-slate-800 hover:text-slate-100 text-slate-300",
    link: "underline-offset-4 hover:underline text-blue-500",
  };
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
    icon: "h-10 w-10",
  };
  
  return (
    <button ref={ref} className={cn(baseStyles, variants[variant], sizes[size], className)} {...props} />
  );
});
Button.displayName = "Button";

export const Card = React.forwardRef(({ className, hoverable, critical, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-xl glass-card text-slate-100 shadow-sm relative overflow-hidden", hoverable && "card-hover", critical && "pulse-critical", className)} {...props} />
));
Card.displayName = "Card";

export const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
));
CardTitle.displayName = "CardTitle";

export const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

export const Badge = React.forwardRef(({ className, variant = 'default', ...props }, ref) => {
  const variants = {
    default: "bg-slate-700 text-slate-100",
    primary: "bg-blue-500/20 text-blue-500 border border-blue-500/30",
    critical: "bg-rose-500/20 text-rose-500 border border-rose-500/30",
    high: "bg-orange-500/20 text-orange-500 border border-orange-500/30",
    medium: "bg-amber-500/20 text-amber-500 border border-amber-500/30",
    low: "bg-emerald-500/20 text-emerald-500 border border-emerald-500/30",
    ai: "bg-blue-500/20 text-blue-400 border border-blue-500/30 font-mono tracking-tight",
    outline: "text-slate-100 border border-slate-700",
  };
  return (
    <div ref={ref} className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2", variants[variant], className)} {...props} />
  );
});
Badge.displayName = "Badge";

export const Progress = React.forwardRef(({ className, value, indicatorColor = "bg-blue-600", ...props }, ref) => (
  <div ref={ref} className={cn("relative h-2 w-full overflow-hidden rounded-full bg-slate-700", className)} {...props}>
    <div className={cn("h-full w-full flex-1 transition-all", indicatorColor)} style={{ transform: `translateX(-${100 - (value || 0)}%)` }} />
  </div>
));
Progress.displayName = "Progress";

import { motion } from 'framer-motion';

export const NeuralInsight = ({ steps, children, className, variant = 'info' }) => {
  const borderColor = variant === 'critical' ? 'border-rose-500' : 'border-blue-500';
  const textColor = variant === 'critical' ? 'text-rose-400' : 'text-blue-400';

  return (
    <div className={cn(`relative flex flex-col gap-3 pl-4 border-l-2 ${borderColor} bg-slate-900/50 py-3 pr-3 overflow-hidden`, className)}>
      <div className="absolute inset-0 scanline-overlay"></div>
      
      <div className="flex items-center gap-2 relative z-10">
        <Badge variant="ai" className="px-1.5 py-0 text-[10px]">NEURAL INSIGHT</Badge>
        <span className="text-xs text-slate-500 font-mono tracking-wide">CLAUDE ANALYTICS</span>
      </div>
      
      <div className="text-sm leading-relaxed tech-text relative z-10">
        {steps ? (
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
            className="flex flex-col gap-1"
          >
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 }
                }}
                className={textColor}
              >
                {step}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-slate-300">{children}</div>
        )}
      </div>
    </div>
  );
};

export const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm ring-offset-slate-900 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"
