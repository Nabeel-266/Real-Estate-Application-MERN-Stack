// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "nab-estate.firebaseapp.com",
  projectId: "nab-estate",
  storageBucket: "nab-estate.appspot.com",
  messagingSenderId: "713003184895",
  appId: "1:713003184895:web:68a278bdbe0f7728b012ca",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

export { auth, GoogleAuthProvider, signInWithPopup };
