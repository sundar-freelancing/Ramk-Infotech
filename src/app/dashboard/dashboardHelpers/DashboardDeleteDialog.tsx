"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CourseInterface } from "@/store/interfaces";
import useAppConfigStore from "@/store/appConfigStore";
import { showToast } from "@/components/helper/Toaster";
import { TOAST_TYPES } from "@/constant/constant";

export const DashboardDeleteDialog = ({
  children,
  course,
}: {
  children: React.ReactNode;
  course: CourseInterface;
}) => {
  const { deleteCourse } = useAppConfigStore();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!course?.id) {
      showToast({
        message: "Course ID is missing",
        type: TOAST_TYPES.ERROR,
      });
      return;
    }

    setIsDeleting(true);
    try {
      await deleteCourse(course.id);
      showToast({
        message: "Course deleted successfully",
        type: TOAST_TYPES.SUCCESS,
      });
    } catch (error) {
      console.error("Error deleting course:", error);
      showToast({
        message: "Failed to delete course",
        description:
          error instanceof Error ? error.message : "An error occurred",
        type: TOAST_TYPES.ERROR,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      {children}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">
            Confirm Deletion
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            Are you sure you want to delete <strong>{course?.name}</strong>?
            This action cannot be undone and will permanently remove the course
            from your catalog.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
