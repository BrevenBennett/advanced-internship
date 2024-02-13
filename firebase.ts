// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCoaPzrJIfZyYw9ThwMMlgObSWMZthBog",
  authDomain: "advanced-internship-2dc8e.firebaseapp.com",
  projectId: "advanced-internship-2dc8e",
  storageBucket: "advanced-internship-2dc8e.appspot.com",
  messagingSenderId: "412231063668",
  appId: "1:412231063668:web:68d9ad4236f5cee5f3d921",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const initFirebase = () => {
  return app;
};
