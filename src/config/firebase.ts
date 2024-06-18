// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  getDoc,
  doc,
  query,
  collection,
  where,
  getDocs,
  runTransaction,
  setDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {};

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
  query,
  collection,
  where,
  getDocs,
  runTransaction,
  setDoc,
  addDoc,
  updateDoc,
};
