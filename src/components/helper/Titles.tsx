"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface TitleProps {
  className?: string;
  children: React.ReactNode;
  aos?: boolean;
}

interface TextProps {
  className?: string;
  children: React.ReactNode;
  aos?: boolean;
}

const Title1 = ({ children, className, aos = true }: TitleProps) => {
  return (
    <p
      className={cn(
        "text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider",
        className
      )}
      data-aos={aos ? "zoom-out" : undefined}
    >
      {children}
    </p>
  );
};

const Title2 = ({ children, className, aos = true }: TitleProps) => {
  return (
    <h2
      className={cn(
        "text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight max-w-5xl mx-auto",
        className
      )}
      data-aos={aos ? "zoom-out" : undefined}
    >
      {children}
    </h2>
  );
};

const Title3 = ({ children, className, aos = true }: TitleProps) => {
  return (
    <h3
      className={cn(
        "text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white leading-tight",
        className
      )}
      data-aos={aos ? "zoom-out" : undefined}
    >
      {children}
    </h3>
  );
};

const Title4 = ({ children, className, aos = true }: TitleProps) => {
  return (
    <h4
      className={cn(
        "text-xl font-bold text-gray-900 dark:text-white leading-tight",
        className
      )}
      data-aos={aos ? "zoom-out" : undefined}
    >
      {children}
    </h4>
  );
};

const Text1 = ({ children, className, aos = true }: TextProps) => {
  return (
    <div
      className={cn("text-muted-foreground", className)}
      data-aos={aos ? "zoom-out" : undefined}
    >
      {children}
    </div>
  );
};

const Text2 = ({ children, className, aos = true }: TextProps) => {
  return (
    <div
      className={cn("text-lg text-gray-600 dark:text-gray-300", className)}
      data-aos={aos ? "zoom-out" : undefined}
    >
      {children}
    </div>
  );
};

const Text3 = ({ children, className, aos = true }: TextProps) => {
  return (
    <div
      className={cn("text-muted-foreground max-w-2xl mx-auto", className)}
      data-aos={aos ? "zoom-out" : undefined}
    >
      {children}
    </div>
  );
};

export { Title1, Title2, Title3, Title4, Text1, Text2, Text3 };
