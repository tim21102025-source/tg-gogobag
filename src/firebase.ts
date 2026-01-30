// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTAbb5RIchuJz-x8dDCJWnKzepMnfehZI",
  authDomain: "telegram-gogobag-shipping.firebaseapp.com",
  projectId: "telegram-gogobag-shipping",
  storageBucket: "telegram-gogobag-shipping.firebasestorage.app",
  messagingSenderId: "1039261637325",
  appId: "1:1039261637325:web:180dae129cd9891973e784",
  measurementId: "G-P2J4132ZKG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);