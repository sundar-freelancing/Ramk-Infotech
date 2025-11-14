"use client";

import React from "react";
import useIconStore from "@/store/iconStore";
import { WhatsappIcon } from "@/constant/whatsapp";

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  color?: string;
  [key: string]: unknown; // For other props like onClick, etc.
}

export const AppIcon: React.FC<IconProps> = ({
  name,
  size = 24,
  className = "",
  color,
  ...props
}) => {
  const getIcon = useIconStore((state) => state.getIcon);
  
  if (name === "whatsapp") {
    return (
      <WhatsappIcon
        size={size}
        className={className}
        color={color}
        {...props}
      />
    );
  }
  
  const IconComponent = getIcon(name);

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in lucide-react`);
    return <div className={`w-${size} h-${size} ${className}`} {...props} />;
  }

  // Type assertion to handle the dynamic component
  const DynamicIcon = IconComponent as React.ComponentType<{
    size?: number;
    className?: string;
    color?: string;
    [key: string]: unknown;
  }>;

  return (
    <DynamicIcon size={size} className={className} color={color} {...props} />
  );
};
