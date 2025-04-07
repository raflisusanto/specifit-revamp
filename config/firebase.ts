import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import {
  Auth,
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Optional import
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: "specifit-react-native.firebaseapp.com",
  projectId: "specifit-react-native",
  storageBucket: "specifit-react-native.appspot.com",
  messagingSenderId: "545785123352",
  appId: "1:545785123352:web:7ec1180bf81c56c7eee96d",
  measurementId: "G-5YFSLE0P00",
};

let app: FirebaseApp;
let auth: Auth;

if (getApps().length < 1) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  app = getApp();
  auth = getAuth();
}

const db = getFirestore(app);

export { auth, db };
