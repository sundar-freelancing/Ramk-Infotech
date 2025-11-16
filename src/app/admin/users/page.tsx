"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createUser, signInUser, UserRole } from "@/firebase/authService";
import Link from "next/link";

interface CreateUserFormData {
  email: string;
  password: string;
  role: UserRole;
}

interface SignInFormData {
  email: string;
  password: string;
}

const UsersPage = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<{
    email: string | null;
    role: string;
    uid: string;
  } | null>(null);

  const createUserForm = useForm<CreateUserFormData>({
    defaultValues: {
      role: "admin",
    },
  });

  const signInForm = useForm<SignInFormData>();

  const selectedRole = createUserForm.watch("role");

  const onCreateUser = async (data: CreateUserFormData) => {
    setIsCreating(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await createUser(data.email, data.password, data.role);
      setSuccess(
        `User created successfully! Email: ${result.user.email}, Role: ${result.userData.role}`
      );
      createUserForm.reset();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create user";
      setError(errorMessage);
    } finally {
      setIsCreating(false);
    }
  };

  const onSignIn = async (data: SignInFormData) => {
    setIsSigningIn(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await signInUser(data.email, data.password);
      setCurrentUser({
        email: result.user.email,
        role: result.userData?.role || "N/A",
        uid: result.user.uid,
      });
      setSuccess(
        `Signed in successfully! Role: ${result.userData?.role || "N/A"}`
      );
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to sign in";
      setError(errorMessage);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="mb-6">
        <Link href="/admin" className="text-blue-500 hover:underline">
          ← Back to Admin Dashboard
        </Link>
        <h1 className="text-3xl font-bold mt-4">User Management</h1>
        <p className="text-muted-foreground mt-2">
          Create new users or sign in. Passwords are automatically encrypted by
          Firebase.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      {currentUser && (
        <div className="mb-4 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded">
          <h3 className="font-semibold">Current User:</h3>
          <p>Email: {currentUser.email}</p>
          <p>Role: {currentUser.role}</p>
          <p>UID: {currentUser.uid}</p>
        </div>
      )}

      <div className="space-y-8">
        {/* Create User Form */}
        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Create New User</h2>
          <form
            onSubmit={createUserForm.handleSubmit(onCreateUser)}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="create-email"
                className="block mb-2 text-sm font-medium"
              >
                Email
              </label>
              <Input
                id="create-email"
                type="email"
                placeholder="user@example.com"
                {...createUserForm.register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {createUserForm.formState.errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {createUserForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="create-password"
                className="block mb-2 text-sm font-medium"
              >
                Password
              </label>
              <Input
                id="create-password"
                type="password"
                placeholder="Enter password"
                {...createUserForm.register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {createUserForm.formState.errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {createUserForm.formState.errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="create-role"
                className="block mb-2 text-sm font-medium"
              >
                Role
              </label>
              <Select
                value={selectedRole}
                onValueChange={(value: UserRole) =>
                  createUserForm.setValue("role", value)
                }
              >
                <SelectTrigger id="create-role" className="w-full">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="super-admin">Super Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" disabled={isCreating} className="w-full">
              {isCreating ? "Creating User..." : "Create User"}
            </Button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
          <form
            onSubmit={signInForm.handleSubmit(onSignIn)}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="signin-email"
                className="block mb-2 text-sm font-medium"
              >
                Email
              </label>
              <Input
                id="signin-email"
                type="email"
                placeholder="user@example.com"
                {...signInForm.register("email", {
                  required: "Email is required",
                })}
              />
              {signInForm.formState.errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {signInForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="signin-password"
                className="block mb-2 text-sm font-medium"
              >
                Password
              </label>
              <Input
                id="signin-password"
                type="password"
                placeholder="Enter password"
                {...signInForm.register("password", {
                  required: "Password is required",
                })}
              />
              {signInForm.formState.errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {signInForm.formState.errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="outline"
              disabled={isSigningIn}
              className="w-full"
            >
              {isSigningIn ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;

