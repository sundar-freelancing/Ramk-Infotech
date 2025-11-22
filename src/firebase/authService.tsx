import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  updateEmail,
  updatePassword,
  sendPasswordResetEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  linkWithPopup,
  deleteUser,
  unlink,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firestore";
import useAdminDataStore from "@/store/adminDataStore";
import { errorHandler } from "./authErr";
export type UserRole = "admin" | "super-admin" | "employee";

export interface adminUserData {
  name: string;
  email: string;
  role: UserRole | null;
  uid: string;
  createdAt: Date;
  isEmailVerified: boolean;
}

export const createUser = async (
  name: string,
  email: string,
  password: string
): Promise<{ user: User; userData: adminUserData }> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: name,
    });

    const userData: adminUserData = {
      name,
      email: user.email || email,
      role: null,
      uid: user.uid,
      createdAt: new Date(),
      isEmailVerified: false,
    };

    await setDoc(doc(db, "users", user.uid), userData);

    return { user, userData };
  } catch (error: unknown) {
    const errorMessage = errorHandler(error);
    throw new Error(`Failed to create user: ${errorMessage}`);
  }
};

export const signUpWithGoogle = async (
  role: UserRole
): Promise<{ user: User; userData: adminUserData }> => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));

    let userData: adminUserData;

    if (userDoc.exists()) {
      userData = userDoc.data() as adminUserData;
    } else {
      const name = user.displayName || user.email?.split("@")[0] || "User";

      userData = {
        name,
        email: user.email || "",
        role,
        uid: user.uid,
        createdAt: new Date(),
        isEmailVerified: false,
      };

      await setDoc(doc(db, "users", user.uid), userData);
    }

    useAdminDataStore.setState({
      userData: userData,
      users: user,
      isLoading: false,
    });

    return { user, userData };
  } catch (error: unknown) {
    const errorMessage = errorHandler(error);
    throw new Error(`Failed to sign up with Google: ${errorMessage}`);
  }
};

export const signInWithGoogle = async (): Promise<{
  user: User;
  userData: adminUserData;
}> => {
  try {
    useAdminDataStore.setState({
      isLoading: true,
    });
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));

    if (!userDoc.exists()) {
      await deleteUser(user);
      await signOut(auth);
      throw new Error(
        "Account not found. Please contact your administrator to create an account."
      );
    }

    const userData = userDoc.data() as adminUserData;

    useAdminDataStore.setState({
      userData: userData,
      users: user,
      isLoading: false,
    });

    return { user, userData };
  } catch (error: unknown) {
    const errorMessage = errorHandler(error);
    throw new Error(`Failed to sign in with Google: ${errorMessage}`);
  } finally {
    useAdminDataStore.setState({
      isLoading: false,
    });
  }
};

export const linkGoogleAccount = async (): Promise<{
  user: User;
  userData: adminUserData | null;
}> => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("No user is currently signed in. Please sign in first.");
    }

    const currentEmail = user.email;
    if (!currentEmail) {
      throw new Error("Current user email is not available.");
    }

    const providerData = user.providerData;
    const hasGoogle = providerData.some(
      (provider) => provider.providerId === "google.com"
    );

    if (hasGoogle) {
      throw new Error("Google account is already linked to this account.");
    }

    const provider = new GoogleAuthProvider();
    const result = await linkWithPopup(user, provider);
    const linkedUser = result.user;

    const googleEmail = linkedUser.email;

    if (!googleEmail) {
      await unlink(linkedUser, "google.com");
      throw new Error("Google account does not have an email address.");
    }

    if (googleEmail !== currentEmail) {
      await unlink(linkedUser, "google.com");
      throw new Error(
        "Google account email does not match your current email. Please use a Google account with the same email address."
      );
    }

    const userDoc = await getDoc(doc(db, "users", linkedUser.uid));

    const userData = userDoc.exists()
      ? (userDoc.data() as adminUserData)
      : null;

    useAdminDataStore.setState({
      userData: userData as adminUserData,
      users: linkedUser,
      isLoading: false,
    });

    return { user: linkedUser, userData };
  } catch (error: unknown) {
    const errorMessage = errorHandler(error);
    throw new Error(`Failed to link Google account: ${errorMessage}`);
  }
};

export const signInUser = async (
  email: string,
  password: string
): Promise<{ user: User; userData: adminUserData | null }> => {
  try {
    useAdminDataStore.setState({
      isLoading: true,
    });
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));

    const userData = userDoc.exists()
      ? (userDoc.data() as adminUserData)
      : null;

    useAdminDataStore.setState({
      userData: userData as adminUserData,
      users: user as User,
      isLoading: false,
    });
    return { user: user as User, userData: userData };
  } catch (error: unknown) {
    const errorMessage = errorHandler(error);
    throw new Error(`Failed to sign in: ${errorMessage}`);
  } finally {
    useAdminDataStore.setState({
      isLoading: false,
    });
  }
};

export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
    useAdminDataStore.setState({
      users: null,
      userData: null,
      isLoading: false,
    });
  } catch (error: unknown) {
    const errorMessage = errorHandler(error);
    throw new Error(`Failed to sign out: ${errorMessage}`);
  }
};

export const updateUserEmail = async (
  newEmail: string,
  currentPassword: string
): Promise<void> => {
  try {
    const user = auth.currentUser;
    if (!user || !user.email) {
      throw new Error("No user is currently signed in");
    }

    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    await reauthenticateWithCredential(user, credential);

    await updateEmail(user, newEmail);

    await updateDoc(doc(db, "users", user.uid), {
      email: newEmail,
    });

    useAdminDataStore.setState({
      userData: {
        ...useAdminDataStore.getState().userData!,
        email: newEmail,
      },
    });
  } catch (error: unknown) {
    const errorMessage = errorHandler(error);
    throw new Error(`Failed to update email: ${errorMessage}`);
  }
};

export const updateUserPassword = async (
  newPassword: string,
  currentPassword: string
): Promise<void> => {
  try {
    const user = auth.currentUser;
    if (!user || !user.email) {
      throw new Error("No user is currently signed in");
    }

    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    await reauthenticateWithCredential(user, credential);

    await updatePassword(user, newPassword);
  } catch (error: unknown) {
    const errorMessage = errorHandler(error);
    throw new Error(`Failed to update password: ${errorMessage}`);
  }
};

export const sendPasswordReset = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: unknown) {
    const errorMessage = errorHandler(error);
    throw new Error(`Failed to send password reset email: ${errorMessage}`);
  }
};
