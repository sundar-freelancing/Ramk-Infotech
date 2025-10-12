"use client";

import { useEffect } from "react";
import useIconStore from "@/store/iconStore";

export const useLucideIcons = () => {
  const { icons, isIconStoreLoading, setIcons, setIconStoreLoading } =
    useIconStore();

  useEffect(() => {
    if (icons) return; // Already loaded

    // Load lucide icons
    import("lucide-react")
      .then((importedIcons) => {
        setIcons(importedIcons);
      })
      .catch((error) => {
        console.error("Failed to load lucide icons:", error);
        setIconStoreLoading(false);
      });
  }, [icons, setIcons, setIconStoreLoading]);

  return { icons, isIconStoreLoading };
};

// Helper function to get a specific icon
export const getLucideIcon = (iconName: string) => {
  return useIconStore.getState().getIcon(iconName);
};
