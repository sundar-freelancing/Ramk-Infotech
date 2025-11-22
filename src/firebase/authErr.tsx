import { FirebaseError } from "firebase/app";

export const errorHandler = (error: unknown): string => {
  if (error instanceof FirebaseError) {
    const errorCode = error.code;

    switch (errorCode) {
      case "auth/email-already-in-use":
        return "This email is already registered. Please use a different email or sign in instead.";
      case "auth/invalid-email":
        return "Invalid email address. Please check and try again.";
      case "auth/operation-not-allowed":
        return "Email/password sign-in is not enabled. Please contact support.";
      case "auth/weak-password":
        return "Password is too weak. Please use a stronger password (at least 6 characters).";
      case "auth/user-disabled":
        return "This account has been disabled. Please contact support.";
      case "auth/user-not-found":
        return "No account found with this email. Please sign up first.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again or use 'Forgot Password' to reset.";
      case "auth/too-many-requests":
        return "Too many failed attempts. Please try again later.";
      case "auth/network-request-failed":
        return "Network error. Please check your internet connection and try again.";
      case "auth/popup-closed-by-user":
        return "Sign-in popup was closed. Please try again.";
      case "auth/cancelled-popup-request":
        return "Only one popup request is allowed at a time. Please try again.";
      case "auth/account-exists-with-different-credential":
        return "An account with this email already exists with a different sign-in method.";
      case "auth/invalid-credential":
        return "Invalid email or password. Please check your credentials and try again.";
      case "auth/provider-already-linked":
        return "Google account is already linked to this account.";
      case "auth/credential-already-in-use":
        return "This Google account is already linked to another account.";
      default:
        const customData = error.customData as
          | { _tokenResponse?: { error?: { message?: string } } }
          | undefined;
        return (
          customData?._tokenResponse?.error?.message ||
          error.message ||
          "An error occurred. Please try again."
        );
    }
  }

  if (error instanceof Error) {
    if (error.message.includes("Account not found")) {
      return error.message;
    }
    if (error.message.includes("does not match")) {
      return error.message;
    }
    if (error.message.includes("does not have an email")) {
      return error.message;
    }
    if (error.message.includes("already linked")) {
      return error.message;
    }
    if (error.message.includes("No user is currently signed in")) {
      return error.message;
    }
    if (error.message.includes("Current user email is not available")) {
      return error.message;
    }
    return error.message;
  }

  return "Unknown error occurred";
};
