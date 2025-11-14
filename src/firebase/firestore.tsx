// lib/firebaseClient.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIT0hINF6PeC0MY-FUA0vr1ePxNVB_jIQ",
  authDomain: "ramk-61495.firebaseapp.com",
  projectId: "ramk-61495",
  storageBucket: "ramk-61495.firebasestorage.app",
  messagingSenderId: "358082398464",
  appId: "1:358082398464:web:052a727917d689c7dc8be5",
  measurementId: "G-2PRSR6EVEB",
};
function initFirebase() {
  // initialize only once
  try {
    return getApps().length ? getApp() : initializeApp(firebaseConfig);
  } catch (err: unknown) {
    console.error(err as Error);
    return initializeApp(firebaseConfig);
  }
}

const app = initFirebase();
export const db = getFirestore(app);
export default app;
