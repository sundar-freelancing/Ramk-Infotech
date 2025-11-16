"use client";

import { Switch } from "@/components/ui/switch";
import { updateAppConfigStatus } from "@/firebase/firebaseService";
import useAppConfigStore from "@/store/appConfigStore";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AppIcon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { signOutUser } from "@/firebase/authService";
import UseAdminDataStore from "@/store/adminDataStore";
import { useRouter } from "next/navigation";

export const Dashboard = () => {
  const { id, appStatus, toggleAppStatus } = useAppConfigStore();
  const { userData, clearUser } = UseAdminDataStore();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleToggleAppStatus = async () => {
    toggleAppStatus();
    await updateAppConfigStatus(id, {
      enabled: !appStatus.enabled,
      reason: !appStatus.enabled
        ? "Admin made the app inactive due to some reason"
        : "",
    });
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    setIsLoggingOut(true);
    try {
      await signOutUser();
      clearUser();
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      // Even if there's an error, clear the local state
      clearUser();
      router.push("/dashboard");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <AppIcon
                    name="layout-dashboard"
                    size={24}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>
                <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
                  Dashboard
                </h1>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                Welcome back{userData?.email ? `, ${userData.email.split("@")[0]}` : ""}! Manage your application settings and monitor status.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {userData && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <AppIcon
                    name="user"
                    size={16}
                    className="text-slate-600 dark:text-slate-400"
                  />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {userData.role === "super-admin" ? "Super Admin" : "Admin"}
                  </span>
                </div>
              )}
              <Button
                variant="outline"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="gap-2"
              >
                {isLoggingOut ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    <span>Logging out...</span>
                  </>
                ) : (
                  <>
                    <AppIcon
                      name="log-out"
                      size={16}
                      className="text-slate-600 dark:text-slate-400"
                    />
                    <span>Logout</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Main Content Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Application Status Card */}
          <Card className="md:col-span-2 lg:col-span-1 border-2 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                    <AppIcon
                      name="activity"
                      size={20}
                      className="text-indigo-600 dark:text-indigo-400"
                    />
                  </div>
                  <CardTitle className="text-xl">Application Status</CardTitle>
                </div>
                <Badge
                  variant={appStatus.enabled ? "default" : "secondary"}
                  className={
                    appStatus.enabled
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }
                >
                  {appStatus.enabled ? "Active" : "Inactive"}
                </Badge>
              </div>
              <CardDescription className="mt-2">
                Control the availability of your application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <AppIcon
                      name={appStatus.enabled ? "check-circle" : "x-circle"}
                      size={20}
                      className={
                        appStatus.enabled
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }
                    />
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {appStatus.enabled
                        ? "Application is live"
                        : "Application is offline"}
                    </span>
                  </div>
                  <Switch
                    checked={appStatus.enabled}
                    onCheckedChange={handleToggleAppStatus}
                    className="data-[state=checked]:bg-green-600"
                  />
                </div>
                {appStatus.reason && (
                  <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AppIcon
                        name="alert-circle"
                        size={16}
                        className="text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0"
                      />
                      <p className="text-sm text-amber-800 dark:text-amber-300">
                        <span className="font-semibold">Reason:</span>{" "}
                        {appStatus.reason}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats Cards */}
          <Card className="hover:shadow-lg transition-shadow border-2 hover:border-blue-300 dark:hover:border-blue-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                  <AppIcon
                    name="users"
                    size={20}
                    className="text-emerald-600 dark:text-emerald-400"
                  />
                </div>
                <CardTitle className="text-xl">Users</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  --
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Total registered users
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-2 hover:border-blue-300 dark:hover:border-blue-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <AppIcon
                    name="settings"
                    size={20}
                    className="text-purple-600 dark:text-purple-400"
                  />
                </div>
                <CardTitle className="text-xl">Settings</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  --
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Configuration options
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Information Card */}
          <Card className="md:col-span-2 border-2 hover:border-blue-300 dark:hover:border-blue-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <AppIcon
                    name="info"
                    size={20}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>
                <CardTitle className="text-xl">Quick Actions</CardTitle>
              </div>
              <CardDescription>
                Common tasks and shortcuts for your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer">
                  <AppIcon
                    name="user-cog"
                    size={20}
                    className="text-slate-600 dark:text-slate-400"
                  />
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">
                      Manage Users
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      View and edit user accounts
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer">
                  <AppIcon
                    name="bar-chart"
                    size={20}
                    className="text-slate-600 dark:text-slate-400"
                  />
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100">
                      View Analytics
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Check performance metrics
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
