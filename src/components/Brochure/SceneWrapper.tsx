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
      className="w-full overflow-x-hidden md:absolute md:inset-0 md:flex md:items-center md:justify-center max-md:relative max-md:min-h-full max-md:overflow-visible"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
