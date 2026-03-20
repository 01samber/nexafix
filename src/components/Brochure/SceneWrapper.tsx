"use client";

interface SceneWrapperProps {
  children: React.ReactNode;
  isActive: boolean;
}

export function SceneWrapper({ children, isActive }: SceneWrapperProps) {
  if (!isActive) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {children}
    </div>
  );
}
