"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { AppLogo } from "@/components/helper/AppLogo";
import { Mail, Clock, Shield } from "lucide-react";
import { signOutUser } from "@/firebase/authService";
import UseAdminDataStore from "@/store/adminDataStore";

export const DashboardEmailVerificationPending = () => {
  const router = useRouter();
  const { clearUser } = UseAdminDataStore();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleTryAgainLater = async () => {
    if (isSigningOut) return;
    setIsSigningOut(true);

    try {
      await signOutUser();
      clearUser();
      router.refresh();
    } catch (error) {
      console.error("Error signing out:", error);
      // Clear user data even if sign out fails
      clearUser();
      router.refresh();
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center font-medium">
          <AppLogo />
        </div>
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-4">
                  <Mail className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <CardTitle className="text-xl">
                Email Verification Pending
              </CardTitle>
              <CardDescription>
                Your account has been created successfully
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <div className="text-center space-y-4 py-4">
                    <p className="text-muted-foreground">
                      Admin will verify your email address soon. Please wait
                      while we process your account verification.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Verification in progress...</span>
                    </div>
                  </div>
                </Field>
                <Field>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleTryAgainLater}
                    disabled={isSigningOut}
                    className="w-full"
                  >
                    {isSigningOut ? "Signing out..." : "Try again later"}
                  </Button>
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export const DashboardRolePending = () => {
  const router = useRouter();
  const { clearUser } = UseAdminDataStore();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleTryAgainLater = async () => {
    if (isSigningOut) return;
    setIsSigningOut(true);

    try {
      await signOutUser();
      clearUser();
      router.refresh();
    } catch (error) {
      console.error("Error signing out:", error);
      // Clear user data even if sign out fails
      clearUser();
      router.refresh();
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center font-medium">
          <AppLogo />
        </div>
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-4">
                  <Shield className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
              <CardTitle className="text-xl">Role Assignment Pending</CardTitle>
              <CardDescription>
                Please wait while Admin assigns you a role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <div className="text-center space-y-4 py-4">
                    <p className="text-muted-foreground">
                      Your account is being set up. An administrator will assign
                      you an appropriate role shortly. You&apos;ll be able to
                      access the dashboard once your role has been assigned.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Role assignment in progress...</span>
                    </div>
                  </div>
                </Field>
                <Field>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleTryAgainLater}
                    disabled={isSigningOut}
                    className="w-full"
                  >
                    {isSigningOut ? "Signing out..." : "Try again later"}
                  </Button>
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
