"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
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
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AppIcon } from "@/components/ui/Icon";
import Link from "next/link";
import { AppLogo } from "@/components/helper/AppLogo";
import { pageLink } from "@/constant/pageURL";
import { signInUser } from "@/firebase/authService";

interface LoginFormData {
  email: string;
  password: string;
}

const DashboardLogin = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);

    try {
      const result = await signInUser(data.email, data.password);
      console.log("Login successful:", result);
      // Reload the page to trigger auth state check in DashboardGuard
      router.refresh();
      // Alternatively, you can redirect to a specific page
      // router.push("/dashboard");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to sign in";
      setError(errorMessage);
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabled = isLoading;
  const btnDisabled = isDisabled || Object.keys(errors).length > 0;

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center font-medium">
          <AppLogo />
        </div>
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Welcome back</CardTitle>
              <CardDescription>Login with your Google account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup>
                  <Field>
                    <Button
                      variant="outline"
                      type="button"
                      disabled={isLoading}
                    >
                      <AppIcon name="google" />
                      Login with Google
                    </Button>
                  </Field>
                  <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                    Or continue with
                  </FieldSeparator>
                  {error && (
                    <Field>
                      <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                        {error}
                      </div>
                    </Field>
                  )}
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      aria-invalid={errors.email ? "true" : "false"}
                      autoFocus={true}
                      disabled={isDisabled}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    {errors.email && (
                      <FieldDescription className="text-destructive">
                        {errors.email.message}
                      </FieldDescription>
                    )}
                  </Field>
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <Link
                        href={pageLink.privacyPolicy}
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      aria-invalid={errors.password ? "true" : "false"}
                      disabled={isDisabled}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                    />
                    {errors.password && (
                      <FieldDescription className="text-destructive">
                        {errors.password.message}
                      </FieldDescription>
                    )}
                  </Field>
                  <Field>
                    <Button type="submit" disabled={btnDisabled}>
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>
                    {/* <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link href={pageLink.signup}>Sign up</Link>
                </FieldDescription> */}
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
          <FieldDescription className="px-6 text-center">
            By clicking continue, you agree to our{" "}
            <Link href={pageLink.termsOfService}>Terms of Service</Link> and{" "}
            <Link href={pageLink.privacyPolicy}>Privacy Policy</Link>.
          </FieldDescription>
        </div>
      </div>
    </div>
  );
};

export default DashboardLogin;
