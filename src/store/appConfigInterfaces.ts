import { StoreApi, UseBoundStore } from "zustand";

interface AppConfig {
  loadingStatus: boolean;
  id: string;
  appStatus: {
    enabled: boolean;
    reason: string;
  };
}

export const defaultAppConfig: AppConfig = {
  loadingStatus: true,
  id: "",
  appStatus: { enabled: false, reason: "" },
};

interface AppConfigStore {
  loadingStatus: boolean;
  id: string;
  appStatus: {
    enabled: boolean;
    reason: string;
  };
  setAppConfig: (config: AppConfig) => void;
  toggleAppStatus: () => void;
}

type AppConfigStoreType = UseBoundStore<StoreApi<AppConfigStore>>;

export type { AppConfig, AppConfigStore, AppConfigStoreType };
