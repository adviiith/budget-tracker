// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgPRmg_FLg7gRrpV2RQaxYbQ1hvMtd-i4",
  authDomain: "project-win-94b4d.firebaseapp.com",
  databaseURL: "https://project-win-94b4d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "project-win-94b4d",
  storageBucket: "project-win-94b4d.firebasestorage.app",
  messagingSenderId: "10936570679",
  appId: "1:10936570679:web:c4f3e1c20833af9e3080b2",
  measurementId: "G-SQQ4ZKG3F2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };