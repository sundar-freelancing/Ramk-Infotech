"use client";

import React, { useEffect, useState } from "react";
import DashboardLogin from "./DashboardLogin";
import UseAdminDataStore from "@/store/adminDataStore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { adminUserData } from "@/firebase/authService";

export const DashboardGuard = ({ children }: { children: React.ReactNode }) => {
  const { users, userData, setUser, setUserData, setIsLoading, clearUser } =
    UseAdminDataStore();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const isLoggedIn = users && userData;

  useEffect(() => {
    setIsLoading(true);
    setIsCheckingAuth(true);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          // User is authenticated, fetch user data from Firestore
          const userDoc = await getDoc(doc(db, "users", user.uid));

          if (userDoc.exists()) {
            const userDataFromFirestore = userDoc.data() as adminUserData;
            setUser(user);
            setUserData(userDataFromFirestore);
          } else {
            // User exists in auth but not in Firestore
            console.warn("User not found in Firestore");
            clearUser();
          }
        } else {
          // User is not authenticated
          clearUser();
        }
      } catch (error) {
        console.error("Error checking auth state:", error);
        clearUser();
      } finally {
        setIsLoading(false);
        setIsCheckingAuth(false);
      }
    });

    return () => unsubscribe();
  }, [setUser, setUserData, setIsLoading, clearUser]);

  // Show loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login if not authenticated
  if (!isLoggedIn) {
    return <DashboardLogin />;
  }

  // Show dashboard if authenticated
  return <>{children}</>;
};
