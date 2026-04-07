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
      className="w-full overflow-x-hidden md:absolute md:inset-0 md:flex md:min-h-0 md:items-start md:justify-center md:overflow-y-auto md:overscroll-y-contain max-md:relative max-md:flex max-md:min-h-0 max-md:flex-1 max-md:flex-col max-md:overflow-visible"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
