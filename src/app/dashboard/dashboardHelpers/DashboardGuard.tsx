"use client";

import React, { useEffect, useState } from "react";
import DashboardLogin from "./DashboardLogin";
import UseAdminDataStore from "@/store/adminDataStore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { adminUserData } from "@/firebase/authService";
import { MainLoader } from "@/components/helper/MainLoader";
import { DashboardSignUp } from "./DashboardSignUp";
import { DashboardSignUpDisable } from "./DashboardSignUpDisable";
import {
  DashboardEmailVerificationPending,
  DashboardRolePending,
} from "./DashboardDisable";

export const DashboardGuard = ({ children }: { children: React.ReactNode }) => {
  const isSingUpActive = true;
  const { users, userData, setUser, setUserData, setIsLoading, clearUser } =
    UseAdminDataStore();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const isLoggedIn = users && userData;
  const [isLogin, setIsLogin] = useState(true);
  const isEmailVerified = userData?.isEmailVerified;
  const userRole = userData?.role;

  useEffect(() => {
    setIsLoading(true);
    setIsCheckingAuth(true);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        console.log(user);
        if (user) {
          console.log(user.uid);
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
    return <MainLoader />;
  }

  // Show login if not authenticated
  if (!isLoggedIn) {
    return isLogin ? (
      <DashboardLogin navToSignUp={() => setIsLogin(false)} />
    ) : isSingUpActive ? (
      <DashboardSignUp navToLogin={() => setIsLogin(true)} />
    ) : (
      <DashboardSignUpDisable navToLogin={() => setIsLogin(true)} />
    );
  }

  // Check email verification status
  if (!isEmailVerified) {
    return <DashboardEmailVerificationPending />;
  }

  // Check role assignment status
  if (!userRole) {
    return <DashboardRolePending />;
  }

  // Show dashboard if authenticated
  return <>{children}</>;
};
