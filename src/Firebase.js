import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAcYlsIrOFrIaVZJeLC_PlRruBhk6PFB1k",
  authDomain: "my-blog-app-9ad21.firebaseapp.com",
  projectId: "my-blog-app-9ad21",
  storageBucket: "my-blog-app-9ad21.appspot.com",
  messagingSenderId: "467795200487",
  appId: "1:467795200487:web:12243ab2a55114f710d542",
  measurementId: "G-SVHVRD43YP"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth =  getAuth(app);

