import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firestore";
import { AppConfig } from "@/store/appConfigInterfaces";

export const updateAppStatus = async (appStatus: AppConfig["appStatus"]) => {
  try {
    await updateDoc(doc(db, "appConfig", "appStatus"), {
      enabled: appStatus.enabled,
      reason: appStatus.reason,
    });
  } catch (error) {
    console.error("Error updating app status:", error);
  }
};
