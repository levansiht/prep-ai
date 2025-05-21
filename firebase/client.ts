// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMOnYLCuovY0xdZ79Z9yqXcmSXYZcmqR4",
  authDomain: "dev-prep-443fc.firebaseapp.com",
  projectId: "dev-prep-443fc",
  storageBucket: "dev-prep-443fc.firebasestorage.app",
  messagingSenderId: "447620665149",
  appId: "1:447620665149:web:08a0c3e09868d27e8f7f54",
  measurementId: "G-C8KE2YR33Q",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const firestore = getFirestore(app);
