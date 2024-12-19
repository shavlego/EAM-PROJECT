import {initializeApp} from "firebase/app";
import {browserLocalPersistence} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { initializeAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUsWEfaacL_YJjxOv_wXlDkR78vkwdrIM",
  authDomain: "eam1-1ba7a.firebaseapp.com",
  projectId: "eam1-1ba7a",
  storageBucket: "eam1-1ba7a.firebasestorage.app",
  messagingSenderId: "451634229549",
  appId: "1:451634229549:web:2c2ab1e548aaef3714a3a4",
  measurementId: "G-XHX8MY30RL"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: browserLocalPersistence,
});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);