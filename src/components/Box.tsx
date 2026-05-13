import { ReactNode } from "react"

export const Box = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full shadow-(--shadow-xl) gap-(--space-4) text-(--color-text) bg-(--color-background)">
      {children}
    </div>
  );
};