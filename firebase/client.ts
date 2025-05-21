// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDun95FRzZMHS3WXrpGTjlAz5qMj5_4mWY",
  authDomain: "ai-prep-af748.firebaseapp.com",
  projectId: "ai-prep-af748",
  storageBucket: "ai-prep-af748.firebasestorage.app",
  messagingSenderId: "8900100819",
  appId: "1:8900100819:web:f5de70d93410ed23b78a26",
  measurementId: "G-23T3Q7RXF2",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const firestore = getFirestore(app);
