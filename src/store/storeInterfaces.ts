import { StoreApi, UseBoundStore } from "zustand";

interface IconStore {
  icons: typeof import("lucide-react") | null;
  isIconStoreLoading: boolean;
  setIcons: (icons: typeof import("lucide-react")) => void;
  setIconStoreLoading: (loading: boolean) => void;
  getIcon: (iconName: string) => React.ComponentType<unknown> | null;
}

type IconStoreType = UseBoundStore<StoreApi<IconStore>>;

export type { IconStore, IconStoreType };
