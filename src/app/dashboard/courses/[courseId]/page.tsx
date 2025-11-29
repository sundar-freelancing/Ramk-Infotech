"use client";

import React from "react";
import { useParams } from "next/navigation";
import DashboardView from "@/app/dashboard/dashboardHelpers/DashboardView";
import {
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useAppConfigStore from "@/store/appConfigStore";
import {
  AlertDialog,
  AlertDialogDescription,
} from "@radix-ui/react-alert-dialog";
import { LoaderCircle } from "lucide-react";

const EditCoursePage = () => {
  const params = useParams();
  const courseId = params.courseId as string;
  const { courses, courseLoadingStatus } = useAppConfigStore();
  const course = courses?.[courseId];

  return (
    <>
      <AlertDialog open={courseLoadingStatus}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="sr-only hidden">
              Course update is in progress. Please wait.
            </AlertDialogTitle>
            <AlertDialogDescription className="flex items-center flex-col gap-2">
              <LoaderCircle className="animate-spin" />
              Course update is in progress. Please wait.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
      <DashboardView course={course} />
    </>
  );
};

export default EditCoursePage;
