// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-l5Hr3rlBhnIeDzaFJdPtT4OZUCGKfjY",
  authDomain: "project-2025-133d3.firebaseapp.com",
  projectId: "project-2025-133d3",
  storageBucket: "project-2025-133d3.firebasestorage.app",
  messagingSenderId: "518095610522",
  appId: "1:518095610522:web:37e0440ae40d8cbafbf523",
  measurementId: "G-JPY8H3EHV7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };
