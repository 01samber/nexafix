"use client";

import { motion } from "motion/react";

interface PremiumButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

export function PremiumButton({
  children,
  onClick,
  variant = "primary",
  className = "",
  size = "md",
  disabled = false,
}: PremiumButtonProps) {
  const base =
    "relative overflow-hidden rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed select-none";
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };
  const variants = {
    primary:
      "bg-[#00d4ff] text-[#0a0e17] shadow-[0_0_30px_rgba(0,212,255,0.3)] hover:shadow-[0_0_40px_rgba(0,212,255,0.5)]",
    secondary:
      "border border-[#00d4ff]/50 text-[#00d4ff] hover:bg-[#00d4ff]/10",
    ghost:
      "text-white/90 hover:bg-white/5 hover:text-white",
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Light sweep on hover */}
      <motion.span
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={false}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.5 }}
      />
      {/* Glow pulse for primary */}
      {variant === "primary" && (
        <motion.span
          className="absolute inset-0 rounded-xl opacity-0"
          style={{
            boxShadow: "0 0 60px rgba(0,212,255,0.6)",
          }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
