// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAnalytics,isSupported } from "firebase/analytics";
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getFirestore} from "firebase/firestore";
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
export const auth = initializeAuth(app,
    {presistence:getReactNativePersistence(ReactNativeAsyncStorage)

    }
)
let analytics;
if (isSupported()) {
  analytics = getAnalytics(app);
}
export const db = getFirestore(app);
