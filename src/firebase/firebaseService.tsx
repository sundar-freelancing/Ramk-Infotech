import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firestore";
import useAppConfigStore from "@/store/appConfigStore";
import { AppConfig, defaultAppConfig } from "@/store/appConfigInterfaces";

export const getAppConfig = async () => {
  try {
    const domain = await getDocs(collection(db, "appConfig"));
    const result = domain.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as AppConfig[];
    const data = result[0];
    console.log(data);
    useAppConfigStore.getState().setAppConfig({
      ...data,
      loadingStatus: false,
    });
  } catch {
    useAppConfigStore.getState().setAppConfig({
      ...defaultAppConfig,
      loadingStatus: false,
    });
  }
};

export const updateAppConfigStatus = async (
  configId: string,
  appStatus: { enabled: boolean; reason: string }
) => {
  try {
    await updateDoc(doc(db, "appConfig", configId), {
      appStatus: appStatus,
    });
  } catch (error) {
    console.error(error);
  }
};
