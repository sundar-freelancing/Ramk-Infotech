import { create } from "zustand";
import {
  AppConfig,
  AppConfigStore,
  defaultAppConfig,
} from "./appConfigInterfaces";

const useAppConfigStore = create<AppConfigStore>((set) => ({
  ...defaultAppConfig,
  setAppConfig: (config: AppConfig) => set(config),
  toggleAppStatus: () =>
    set((state) => ({
      appStatus: {
        enabled: !state.appStatus.enabled,
        reason: !state.appStatus.enabled
          ? "Admin made the app inactive due to some reason"
          : "",
      },
    })),
}));

export default useAppConfigStore;
