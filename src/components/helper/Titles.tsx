"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface TitleProps {
  className?: string;
  children: React.ReactNode;
}

const Title1 = ({ children, className }: TitleProps) => {
  return (
    <div
      className={cn(
        "text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider",
        className
      )}
    >
      {children}
    </div>
  );
};

const Title2 = ({ children, className }: TitleProps) => {
  return (
    <div
      className={cn(
        "text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight",
        className
      )}
    >
      {children}
    </div>
  );
};

const Title3 = ({ children, className }: TitleProps) => {
  return (
    <div
      className={cn(
        "text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white leading-tight",
        className
      )}
    >
      {children}
    </div>
  );
};

export { Title1, Title2, Title3 };
