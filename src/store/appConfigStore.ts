import { create } from "zustand";
import {
  AppConfig,
  AppConfigStore,
  defaultAppConfig,
} from "./appConfigInterfaces";
import { CourseInterface } from "./interfaces";
import {
  createCourse as createCourseFirebase,
  updateCourse as updateCourseFirebase,
  deleteCourse as deleteCourseFirebase,
} from "@/firebase/courseService";
import { showToast } from "@/components/helper/Toaster";
import { TOAST_TYPES } from "@/constant/constant";

const useAppConfigStore = create<AppConfigStore>((set) => ({
  ...defaultAppConfig,
  setAppConfig: (config: AppConfig) => set(config),

  // App Status
  toggleAppStatus: () =>
    set((state) => ({
      appStatus: {
        enabled: !state.appStatus.enabled,
        reason: !state.appStatus.enabled
          ? "Admin made the app inactive due to some reason"
          : "",
      },
    })),

  // Courses
  setCourseLoadingStatus: (loading: boolean) =>
    set({ courseLoadingStatus: loading }),
  addCourse: async (course: CourseInterface) => {
    try {
      set({ courseLoadingStatus: true });
      const newCourse = await createCourseFirebase(course);
      console.log(newCourse);
      set((state) => ({
        courses: state.courses
          ? { ...state.courses, [newCourse.id]: newCourse }
          : { [newCourse.id]: newCourse },
      }));
      showToast({
        message: "Course added successfully",
        type: TOAST_TYPES.SUCCESS,
      });
      return newCourse;
    } catch (error) {
      console.error("Error adding course:", error);
      showToast({
        message: "Failed to add course",
        description:
          error instanceof Error ? error.message : "An error occurred",
        type: TOAST_TYPES.ERROR,
      });
      throw error;
    } finally {
      set({ courseLoadingStatus: false });
    }
  },
  deleteCourse: async (courseId: string) => {
    try {
      set({ courseLoadingStatus: true });
      await deleteCourseFirebase(courseId);
      set((state) => {
        if (!state.courses) return { courses: null };
        const remainingCourses = { ...state.courses };
        delete remainingCourses[courseId];
        return {
          courses:
            Object.keys(remainingCourses).length > 0 ? remainingCourses : null,
        };
      });
      showToast({
        message: "Course deleted successfully",
        type: TOAST_TYPES.SUCCESS,
      });
    } catch (error) {
      set({ courseLoadingStatus: false });
      console.error("Error deleting course:", error);
      showToast({
        message: "Failed to delete course",
        description:
          error instanceof Error ? error.message : "An error occurred",
        type: TOAST_TYPES.ERROR,
      });
      throw error;
    } finally {
      set({ courseLoadingStatus: false });
    }
  },
  updateCourse: async (course: CourseInterface) => {
    try {
      set({ courseLoadingStatus: true });
      await updateCourseFirebase(course);
      set((state) => ({
        courses: state.courses
          ? { ...state.courses, [course.id]: course }
          : null,
      }));
    } catch (error) {
      console.error("Error updating course:", error);
      showToast({
        message: "Failed to update course",
        description:
          error instanceof Error ? error.message : "An error occurred",
        type: TOAST_TYPES.ERROR,
      });
      throw error;
    } finally {
      set({ courseLoadingStatus: false });
    }
  },
}));

export default useAppConfigStore;
