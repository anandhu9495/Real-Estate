// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-project-f2ad4.firebaseapp.com",
  projectId: "real-project-f2ad4",
  storageBucket: "real-project-f2ad4.appspot.com",
  messagingSenderId: "631093673257",
  appId: "1:631093673257:web:5179ae2028c0054a5a8b38"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const storage = getStorage(app);
