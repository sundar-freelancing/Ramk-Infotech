"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field";
import Link from "next/link";
import { AppLogo } from "@/components/helper/AppLogo";
import { pageLink } from "@/constant/pageURL";

export const DashboardSignUpDisable = ({
  navToLogin,
}: {
  navToLogin: () => void;
}) => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center font-medium">
          <AppLogo />
        </div>
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Sign Up Disabled</CardTitle>
              <CardDescription>
                New account registration is currently unavailable
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <div className="text-center space-y-4 py-4">
                    <p className="text-muted-foreground">
                      We&apos;re sorry, but new account registration is
                      temporarily disabled. Please contact the administrator if
                      you need access.
                    </p>
                  </div>
                </Field>
                <Field>
                  <Button
                    type="button"
                    onClick={navToLogin}
                    className="w-full"
                  >
                    Back to Login
                  </Button>
                  <FieldDescription className="text-center">
                    Already have an account?{" "}
                    <Link href="#" onClick={navToLogin}>
                      Sign in
                    </Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>
          <FieldDescription className="px-6 text-center">
            By continuing, you agree to our{" "}
            <Link href={pageLink.termsOfService}>Terms of Service</Link> and{" "}
            <Link href={pageLink.privacyPolicy}>Privacy Policy</Link>.
          </FieldDescription>
        </div>
      </div>
    </div>
  );
};

