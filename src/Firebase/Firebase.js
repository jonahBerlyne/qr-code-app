// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, getFirestore } from "firebase/firestore";
import React, { useState, useEffect } from 'react';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
initializeApp(firebaseConfig);

export default getFirestore();

const auth = getAuth();

export function signUp(email, password) {
 return createUserWithEmailAndPassword(auth, email, password);
}

export function logIn(email, password) {
 return signInWithEmailAndPassword(auth, email, password);
}

export function logOut() {
 return signOut(auth);
}

export function useAuth() {
 const [currentUser, setCurrentUser] = useState();

 useEffect(() => {
  const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
  return unsub;
 }, []);

 return currentUser;
}