// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { getFirestore, getDoc, doc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIkutTtwY8K4geJ3xI3u0B2NqKUjmO63A",
  authDomain: "e-farmas.firebaseapp.com",
  projectId: "e-farmas",
  storageBucket: "e-farmas.appspot.com",
  messagingSenderId: "278743064106",
  appId: "1:278743064106:web:b8011f1e5f715bfe346d53",
  measurementId: "G-Y889XNW0S4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
  app,
  db,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getDoc,
  doc,
  signOut,
};
