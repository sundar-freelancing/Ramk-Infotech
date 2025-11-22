"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import { useLucideIcons } from "@/hooks/useLucideIcons";
import { ThemeProvider } from "@/components/theme-provider";
import { usePathname } from "next/navigation";
import { PublicPageComponents } from "@/components/common/PublicPageComponents";
import { scrollToTop } from "@/constant/helperFunction";
import useAppConfigStore from "@/store/appConfigStore";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firestore";
import { AppConfig, defaultAppConfig } from "@/store/appConfigInterfaces";
import { MainLoader } from "@/components/helper/MainLoader";
import Toast from "@/components/helper/Toaster";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const [isAOSInitialized, setIsAOSInitialized] = useState(false);
  const { loadingStatus } = useAppConfigStore();
  const { isIconStoreLoading } = useLucideIcons();
  const isDashboardRoute = pathname.includes("/dashboard") || pathname.includes("/signup");

  useEffect(() => {
    if (isDashboardRoute) return;
    const unsubscribe = onSnapshot(
      collection(db, "appConfig"),
      (snapshot) => {
        try {
          const result = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as AppConfig[];
          const data = result[0];
          if (data) {
            console.log(data);
            useAppConfigStore.getState().setAppConfig({
              ...data,
              loadingStatus: false,
            });
          } else {
            useAppConfigStore.getState().setAppConfig({
              ...defaultAppConfig,
              loadingStatus: false,
            });
          }
        } catch (error) {
          console.error("Error processing app config:", error);
          useAppConfigStore.getState().setAppConfig({
            ...defaultAppConfig,
            loadingStatus: false,
          });
        }
      },
      (error) => {
        console.error("Error listening to app config:", error);
        useAppConfigStore.getState().setAppConfig({
          ...defaultAppConfig,
          loadingStatus: false,
        });
      }
    );

    return () => unsubscribe();
  }, [isDashboardRoute]);

  useEffect(() => {
    if (isDashboardRoute) return;
    AOS.init({
      duration: 500,
      once: true,
      offset: 100,
      delay: 0,
      easing: "ease-in-out",
      mirror: false,
      anchorPlacement: "center-bottom",
    });

    // Mark AOS as initialized after ensuring it's ready
    const timer = setTimeout(() => {
      setIsAOSInitialized(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [isDashboardRoute]);

  const page = usePathname();

  useEffect(() => {
    if (page) {
      scrollToTop(false);
    }
  }, [page]);

  const isLoading = isDashboardRoute
    ? false
    : !isAOSInitialized || isIconStoreLoading || loadingStatus;

  return (
    <ThemeProvider
      attribute="class"
      // defaultTheme="system"
      defaultTheme="light"
      enableSystem
    >
      {isLoading ? (
        <MainLoader />
      ) : (
        <>
          <PublicPageComponents>{children}</PublicPageComponents>
          <Toast />
        </>
      )}
    </ThemeProvider>
  );
}
