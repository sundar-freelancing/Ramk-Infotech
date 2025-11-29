import { StoreApi, UseBoundStore } from "zustand";
import { CourseInterface } from "./interfaces";

interface AppConfig {
  loadingStatus: boolean;
  appStatus: {
    enabled: boolean;
    reason: string;
  };
  courses: Record<string, CourseInterface> | null;
  courseLoadingStatus: boolean;
}

export const defaultAppConfig: AppConfig = {
  loadingStatus: true,
  appStatus: { enabled: false, reason: "" },
  courses: null,
  courseLoadingStatus: false,
};

interface AppConfigStore {
  loadingStatus: boolean;
  appStatus: {
    enabled: boolean;
    reason: string;
  };
  courses: Record<string, CourseInterface> | null;
  courseLoadingStatus: boolean;
  setAppConfig: (config: AppConfig) => void;
  toggleAppStatus: () => void;
  setCourseLoadingStatus: (loading: boolean) => void;
  addCourse: (course: CourseInterface) => Promise<CourseInterface>;
  deleteCourse: (courseId: string) => Promise<void>;
  updateCourse: (course: CourseInterface) => Promise<void>;
}

type AppConfigStoreType = UseBoundStore<StoreApi<AppConfigStore>>;

export type { AppConfig, AppConfigStore, AppConfigStoreType };
