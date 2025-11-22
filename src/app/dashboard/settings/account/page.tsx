"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import UseAdminDataStore from "@/store/adminDataStore";
import {
  updateUserEmail,
  updateUserPassword,
  sendPasswordReset,
  linkGoogleAccount,
} from "@/firebase/authService";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Mail,
  Lock,
  KeyRound,
  AlertCircle,
  CheckCircle2,
  Link2,
} from "lucide-react";
import { getInitials } from "@/constant/helperFunction";

interface EmailFormData {
  newEmail: string;
  currentPassword: string;
}

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function AccountPage() {
  const { users, userData } = UseAdminDataStore();
  const [emailLoading, setEmailLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [linkLoading, setLinkLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [resetError, setResetError] = useState<string | null>(null);
  const [linkError, setLinkError] = useState<string | null>(null);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [linkSuccess, setLinkSuccess] = useState(false);

  const userEmail = users?.email || userData?.email || "user@example.com";
  const userName = userEmail.split("@")[0];
  const userInitials = getInitials(userName);
  const userRole = userData?.role || "admin";

  // Check if Google is already linked
  const hasGoogleLinked =
    users?.providerData?.some(
      (provider) => provider.providerId === "google.com"
    ) || false;
  const hasEmailPassword =
    users?.providerData?.some(
      (provider) => provider.providerId === "password"
    ) || false;

  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
    reset: resetEmailForm,
  } = useForm<EmailFormData>();

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPasswordForm,
    watch,
  } = useForm<PasswordFormData>();

  const newPassword = watch("newPassword");

  const onEmailSubmit = async (data: EmailFormData) => {
    setEmailLoading(true);
    setEmailError(null);
    setEmailSuccess(false);

    try {
      await updateUserEmail(data.newEmail, data.currentPassword);
      setEmailSuccess(true);
      resetEmailForm();
      setTimeout(() => setEmailSuccess(false), 5000);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update email";
      setEmailError(errorMessage);
    } finally {
      setEmailLoading(false);
    }
  };

  const onPasswordSubmit = async (data: PasswordFormData) => {
    if (data.newPassword !== data.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setPasswordLoading(true);
    setPasswordError(null);
    setPasswordSuccess(false);

    try {
      await updateUserPassword(data.newPassword, data.currentPassword);
      setPasswordSuccess(true);
      resetPasswordForm();
      setTimeout(() => setPasswordSuccess(false), 5000);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update password";
      setPasswordError(errorMessage);
    } finally {
      setPasswordLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    setResetLoading(true);
    setResetError(null);
    setResetSuccess(false);

    try {
      await sendPasswordReset(userEmail);
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 5000);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to send password reset email";
      setResetError(errorMessage);
    } finally {
      setResetLoading(false);
    }
  };

  const handleLinkGoogle = async () => {
    setLinkLoading(true);
    setLinkError(null);
    setLinkSuccess(false);

    try {
      await linkGoogleAccount();
      setLinkSuccess(true);
      setTimeout(() => setLinkSuccess(false), 5000);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to link Google account";
      setLinkError(errorMessage);
    } finally {
      setLinkLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your account details and security settings
        </p>
      </div>

      {/* Account Details Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <CardTitle>Account Details</CardTitle>
              <CardDescription>Your account information</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="" alt={userName} />
              <AvatarFallback className="text-lg">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-sm text-muted-foreground">{userEmail}</p>
              <p className="text-xs text-muted-foreground capitalize">
                Role: {userRole}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Change Email Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Mail className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <CardTitle>Change Email</CardTitle>
              <CardDescription>Update your email address</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleEmailSubmit(onEmailSubmit)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="current-email">Current Email</Label>
              <Input
                id="current-email"
                type="email"
                value={userEmail}
                disabled
                className="bg-muted"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-email">New Email</Label>
              <Input
                id="new-email"
                type="email"
                placeholder="Enter new email"
                {...registerEmail("newEmail", {
                  required: "New email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {emailErrors.newEmail && (
                <p className="text-sm text-destructive">
                  {emailErrors.newEmail.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email-password">Current Password</Label>
              <Input
                id="email-password"
                type="password"
                placeholder="Enter current password"
                {...registerEmail("currentPassword", {
                  required: "Current password is required",
                })}
              />
              {emailErrors.currentPassword && (
                <p className="text-sm text-destructive">
                  {emailErrors.currentPassword.message}
                </p>
              )}
            </div>

            {emailError && (
              <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                <AlertCircle className="h-4 w-4" />
                <span>{emailError}</span>
              </div>
            )}

            {emailSuccess && (
              <div className="flex items-center gap-2 p-3 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                <CheckCircle2 className="h-4 w-4" />
                <span>Email updated successfully!</span>
              </div>
            )}

            <Button type="submit" disabled={emailLoading}>
              {emailLoading ? "Updating..." : "Update Email"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Separator />

      {/* Change Password Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Lock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your account password</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handlePasswordSubmit(onPasswordSubmit)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                placeholder="Enter current password"
                {...registerPassword("currentPassword", {
                  required: "Current password is required",
                })}
              />
              {passwordErrors.currentPassword && (
                <p className="text-sm text-destructive">
                  {passwordErrors.currentPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="Enter new password"
                {...registerPassword("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {passwordErrors.newPassword && (
                <p className="text-sm text-destructive">
                  {passwordErrors.newPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm new password"
                {...registerPassword("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === newPassword || "Passwords do not match",
                })}
              />
              {passwordErrors.confirmPassword && (
                <p className="text-sm text-destructive">
                  {passwordErrors.confirmPassword.message}
                </p>
              )}
            </div>

            {passwordError && (
              <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                <AlertCircle className="h-4 w-4" />
                <span>{passwordError}</span>
              </div>
            )}

            {passwordSuccess && (
              <div className="flex items-center gap-2 p-3 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                <CheckCircle2 className="h-4 w-4" />
                <span>Password updated successfully!</span>
              </div>
            )}

            <Button type="submit" disabled={passwordLoading}>
              {passwordLoading ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Separator />

      {/* Linked Accounts Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <Link2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <CardTitle>Linked Accounts</CardTitle>
              <CardDescription>
                Connect your accounts for easier sign-in
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-3">
              {/* Email/Password Status */}
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Email & Password</p>
                    <p className="text-xs text-muted-foreground">
                      {hasEmailPassword
                        ? "Linked"
                        : "Sign in with email and password"}
                    </p>
                  </div>
                </div>
                {hasEmailPassword && (
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                    ✓ Active
                  </span>
                )}
              </div>

              {/* Google Status */}
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-medium">Google</p>
                    <p className="text-xs text-muted-foreground">
                      {hasGoogleLinked
                        ? "Linked - Sign in with Google"
                        : "Not linked"}
                    </p>
                  </div>
                </div>
                {hasGoogleLinked ? (
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                    ✓ Active
                  </span>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleLinkGoogle}
                    disabled={linkLoading || !hasEmailPassword}
                  >
                    {linkLoading ? "Linking..." : "Link Account"}
                  </Button>
                )}
              </div>
            </div>

            {!hasEmailPassword && hasGoogleLinked && (
              <div className="text-xs text-muted-foreground p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg space-y-2">
                <p className="font-medium text-blue-900 dark:text-blue-100">
                  Want to sign in with email/password too?
                </p>
                <p>To enable email/password login with your Google account:</p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li>Sign out of your account</li>
                  <li>Go to the signup page</li>
                  <li>
                    Sign up with email/password using:{" "}
                    <strong>{userEmail}</strong>
                  </li>
                  <li>
                    After signing in, come back here and link your Google
                    account
                  </li>
                </ol>
                <p className="text-xs mt-2">
                  This will allow you to sign in with either Google or
                  email/password using the same account.
                </p>
              </div>
            )}

            {!hasEmailPassword && !hasGoogleLinked && (
              <p className="text-xs text-muted-foreground p-3 bg-muted rounded-lg">
                Note: You need to have an email/password account first before
                linking Google. Sign up with email/password to enable this
                feature.
              </p>
            )}

            {linkError && (
              <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                <AlertCircle className="h-4 w-4" />
                <span>{linkError}</span>
              </div>
            )}

            {linkSuccess && (
              <div className="flex items-center gap-2 p-3 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                <CheckCircle2 className="h-4 w-4" />
                <span>
                  Google account linked successfully! You can now sign in with
                  either method.
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Forgot Password Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <KeyRound className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <CardTitle>Reset Password</CardTitle>
              <CardDescription>
                Send a password reset email to your account
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              If youve forgotten your password, we can send a password reset
              link to your email address: <strong>{userEmail}</strong>
            </p>

            {resetError && (
              <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                <AlertCircle className="h-4 w-4" />
                <span>{resetError}</span>
              </div>
            )}

            {resetSuccess && (
              <div className="flex items-center gap-2 p-3 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                <CheckCircle2 className="h-4 w-4" />
                <span>Password reset email sent! Please check your inbox.</span>
              </div>
            )}

            <Button
              type="button"
              variant="outline"
              onClick={handlePasswordReset}
              disabled={resetLoading}
            >
              {resetLoading ? "Sending..." : "Send Password Reset Email"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
