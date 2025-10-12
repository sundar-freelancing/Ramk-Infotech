import { create } from "zustand";
import { IconStore } from "./storeInterfaces";

const useIconStore = create<IconStore>((set, get) => ({
  // State to store the icons
  icons: null,
  isIconStoreLoading: true,

  // Function to set the icons
  setIcons: (icons) => set({ icons, isIconStoreLoading: false }),

  // Function to set loading state
  setIconStoreLoading: (loading) => set({ isIconStoreLoading: loading }),

  // Function to get a specific icon by name
  getIcon: (iconName: string) => {
    const { icons } = get();
    if (!icons) return null;

    // Convert kebab-case to PascalCase (e.g., 'menu-icon' -> 'MenuIcon')
    const pascalCaseName = iconName
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");

    return (
      (icons as unknown as Record<string, React.ComponentType<unknown>>)[
        pascalCaseName
      ] || null
    );
  },
}));

export default useIconStore;
