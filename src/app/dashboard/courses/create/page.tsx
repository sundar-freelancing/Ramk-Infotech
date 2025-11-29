"use client";

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
const CreateCourse = () => {
  const { courseLoadingStatus } = useAppConfigStore();

  return (
    <>
      <AlertDialog open={courseLoadingStatus}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="sr-only hidden">
              Course creation is in progress. Please wait.
            </AlertDialogTitle>
            <AlertDialogDescription className="flex items-center flex-col gap-2">
              <LoaderCircle className="animate-spin" />
              Course creation is in progress. Please wait.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
      <DashboardView />
    </>
  );
};

export default CreateCourse;
