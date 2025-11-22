"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
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
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { AppLogo } from "@/components/helper/AppLogo";
import { pageLink } from "@/constant/pageURL";
import { createUser } from "@/firebase/authService";
import { TOAST_TYPES } from "@/constant/constant";
import { showToast } from "@/components/helper/Toaster";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const DashboardSignUp = ({ navToLogin }: { navToLogin: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<SignUpFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data: SignUpFormData) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      // Validate password match
      if (data.password !== data.confirmPassword) {
        showToast({
          message: "Passwords do not match",
          type: TOAST_TYPES.ERROR,
        });
        setIsLoading(false);
        return;
      }

      const result = await createUser(data.name, data.email, data.password);

      showToast({
        message: `Account created successfully! Welcome, ${result.userData.name}`,
        type: TOAST_TYPES.SUCCESS,
      });
      reset();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create account";
      console.log(err);
      showToast({
        message: errorMessage,
        type: TOAST_TYPES.ERROR,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabled = isLoading;
  const btnDisabled = isDisabled || Object.keys(errors).length > 0;

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center font-medium">
          <AppLogo />
        </div>
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Create an account</CardTitle>
              <CardDescription>Sign up to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="name">Full Name</FieldLabel>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      aria-invalid={errors.name ? "true" : "false"}
                      autoFocus={true}
                      disabled={isDisabled}
                      {...register("name", {
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      })}
                    />
                    {errors.name && (
                      <FieldDescription className="text-destructive">
                        {errors.name.message}
                      </FieldDescription>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      aria-invalid={errors.email ? "true" : "false"}
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
                    <FieldLabel htmlFor="password">Password</FieldLabel>
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
                    <FieldLabel htmlFor="confirmPassword">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id="confirmPassword"
                      type="password"
                      aria-invalid={errors.confirmPassword ? "true" : "false"}
                      disabled={isDisabled}
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === password || "Passwords do not match",
                      })}
                    />
                    {errors.confirmPassword && (
                      <FieldDescription className="text-destructive">
                        {errors.confirmPassword.message}
                      </FieldDescription>
                    )}
                  </Field>
                  <Field>
                    <Button type="submit" disabled={btnDisabled}>
                      {isLoading ? "Creating account..." : "Create account"}
                    </Button>
                    <FieldDescription className="text-center">
                      Already have an account?{" "}
                      <Link href="#" onClick={navToLogin}>
                        Sign in
                      </Link>
                    </FieldDescription>
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
