import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB9CXsBVo6BhvvTUSr9IBOn7w48SDLlVc8",
  authDomain: "wheels-f3dde.firebaseapp.com",
  projectId: "wheels-f3dde",
  storageBucket: "wheels-f3dde.firebasestorage.app",
  messagingSenderId: "255453255808",
  appId: "1:255453255808:web:a378e4d752537484c92e65",
  measurementId: "G-5PR9YVZPH8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
