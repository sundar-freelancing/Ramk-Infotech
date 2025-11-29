"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import { useLucideIcons } from "@/hooks/useLucideIcons";
import { ThemeProvider } from "@/components/theme-provider";
import { usePathname } from "next/navigation";
import { PublicPageComponents } from "@/components/common/PublicPageComponents";
import { scrollToTop } from "@/constant/helperFunction";
import useAppConfigStore from "@/store/appConfigStore";
import { collection, onSnapshot, DocumentData } from "firebase/firestore";
import { db } from "@/firebase/firestore";
import { MainLoader } from "@/components/helper/MainLoader";
import Toast from "@/components/helper/Toaster";
import { defaultAppConfig } from "@/store/appConfigInterfaces";
import { pageLink } from "@/constant/pageURL";
import UseAdminDataStore from "@/store/adminDataStore";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const [isAOSInitialized, setIsAOSInitialized] = useState(false);
  const { loadingStatus } = useAppConfigStore();
  const { isIconStoreLoading } = useLucideIcons();
  const isDashboardRoute = pathname.includes(pageLink.dashboard);
  const { userData } = UseAdminDataStore();

  useEffect(() => {
    if (isDashboardRoute && !userData) return;
    const unsubscribe = onSnapshot(
      collection(db, "appConfig"),
      (snapshot) => {
        try {
          const result = snapshot.docs.reduce((acc, doc) => {
            acc[doc.id] = doc.data();
            return acc;
          }, {} as Record<string, DocumentData>);

          console.log("AppConfig Object:", result);

          useAppConfigStore.getState().setAppConfig({
            ...defaultAppConfig,
            loadingStatus: false,
            ...result,
          });
        } catch (error) {
          console.log(error);
        }
      },
      (error) => {
        console.error("Error listening to app config:", error);
      }
    );

    return () => unsubscribe();
  }, [isDashboardRoute, userData]);

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
