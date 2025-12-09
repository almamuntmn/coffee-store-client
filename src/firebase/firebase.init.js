// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBn1AZAKlvvS6eRlOA5rUSOJcOdYu5iP1k",
  authDomain: "coffee-store-app-bfc58.firebaseapp.com",
  projectId: "coffee-store-app-bfc58",
  storageBucket: "coffee-store-app-bfc58.firebasestorage.app",
  messagingSenderId: "46254756964",
  appId: "1:46254756964:web:2e65cd6977949cb0d53b71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);