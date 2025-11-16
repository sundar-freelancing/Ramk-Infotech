import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firestore";
import useAdminDataStore from "@/store/adminDataStore";

export type UserRole = "admin" | "super-admin";

export interface adminUserData {
  email: string;
  role: UserRole;
  uid: string;
  createdAt: Date;
}

/**
 * Create a new user with email and password
 * Password is automatically encrypted/hashed by Firebase Auth
 * @param email - User email
 * @param password - User password (will be encrypted by Firebase)
 * @param role - User role (admin or super-admin)
 * @returns User object and user data
 */
export const createUser = async (
  email: string,
  password: string,
  role: UserRole
): Promise<{ user: User; userData: adminUserData }> => {
  try {
    // Create user in Firebase Auth (password is automatically encrypted)
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User created:", user);

    // Store user data with role in Firestore
    const userData: adminUserData = {
      email: user.email || email,
      role,
      uid: user.uid,
      createdAt: new Date(),
    };

    await setDoc(doc(db, "users", user.uid), userData);

    return { user, userData };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(`Failed to create user: ${errorMessage}`);
  }
};

/**
 * Sign in user with email and password
 * @param email - User email
 * @param password - User password
 * @returns User object and user data from Firestore
 */
export const signInUser = async (
  email: string,
  password: string
): Promise<{ user: User; userData: adminUserData | null }> => {
  try {
    useAdminDataStore.setState({
      isLoading: true,
    });
    // Sign in user (Firebase handles password verification)
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User signed in:", user);
    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    // console.log("User document:", userDoc);

    const userData = userDoc.exists()
      ? (userDoc.data() as adminUserData)
      : null;
    console.log("User data:", userData);
    useAdminDataStore.setState({
      userData: userData as adminUserData,
      users: user as User,
      isLoading: false,
    });
    return { user: user as User, userData: userData };
  } catch (error: unknown) {
    console.error("Failed to sign in:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(`Failed to sign in: ${errorMessage}`);
  } finally {
    useAdminDataStore.setState({
      isLoading: false,
    });
  }
};

/**
 * Sign out current user
 */
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
    // Clear user data from store
    useAdminDataStore.setState({
      users: null,
      userData: null,
      isLoading: false,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(`Failed to sign out: ${errorMessage}`);
  }
};
