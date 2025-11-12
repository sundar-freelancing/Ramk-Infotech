// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdN9VwDxlGOPKG0IO160UiHbM9PdD0xxU",
  authDomain: "test-71dee.firebaseapp.com",
  projectId: "test-71dee",
  storageBucket: "test-71dee.firebasestorage.app",
  messagingSenderId: "530840400101",
  appId: "1:530840400101:web:80e2921c3081f70ec6640c",
  measurementId: "G-9WMK694788",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };