import { adminUserData } from "@/firebase/authService";
import { User } from "firebase/auth";
import { create } from "zustand";

interface AdminDataStore {
  users: User | null;
  userData: adminUserData | null;
  setUserData: (userData: adminUserData | null) => void;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  clearUser: () => void;
}

const defaultAdminDataStore: AdminDataStore = {
  users: null,
  userData: null,
  setUserData: () => {},
  setUser: () => {},
  isLoading: false,
  setIsLoading: () => {},
  clearUser: () => {},
};

const UseAdminDataStore = create<AdminDataStore>((set) => ({
  ...defaultAdminDataStore,
  setIsLoading: (loading) => set({ isLoading: loading }),
  setUserData: (userData) => set({ userData }),
  setUser: (user) => set({ users: user }),
  clearUser: () => set({ users: null, userData: null }),
}));

export default UseAdminDataStore;
