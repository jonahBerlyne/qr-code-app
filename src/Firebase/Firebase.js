// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, getFirestore } from "firebase/firestore";
import React, { useState, useEffect } from 'react';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtVk6VHuKv09QlPZMtdO7qgERbvJIuiVY",
  authDomain: "qr-code-app-ff5c2.firebaseapp.com",
  projectId: "qr-code-app-ff5c2",
  storageBucket: "qr-code-app-ff5c2.appspot.com",
  messagingSenderId: "127543328152",
  appId: "1:127543328152:web:db35dc3ca028d7d9a97fed"
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
 const [currentUser, setCurrentUser ] = useState();

 useEffect(() => {
  const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
  return unsub;
 }, []);

 return currentUser;
}