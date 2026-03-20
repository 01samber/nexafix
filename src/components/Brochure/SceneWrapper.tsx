"use client";

import { motion } from "motion/react";

interface SceneWrapperProps {
  children: React.ReactNode;
  isActive: boolean;
}

export function SceneWrapper({ children, isActive }: SceneWrapperProps) {
  if (!isActive) return null;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
