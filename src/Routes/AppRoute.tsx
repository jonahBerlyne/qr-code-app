import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import fireDB, { auth } from '../firebaseConfig';
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, User } from 'firebase/auth';
import { useDispatch } from "react-redux";
import { AppDispatch, store } from '../Redux/Store';
import { login } from '../Redux/userSlice';

export default function AppRoute ({ children }: {children: any}) {
 const [pending, setPending] = useState<boolean>(true);
 const [currentUser, setCurrentUser] = useState<any>(null);
 const dispatch = useDispatch<AppDispatch>();
 
 const getUserInfo = async (user: User): Promise<any> => {
   let storeLength = 0;
   try {
     while (storeLength < 2) {
       const docRef = doc(fireDB, "users", `${user.uid}`);
       const docSnapshot = await getDoc(docRef);
       dispatch(
         login({
           ...docSnapshot.data(),
           id: docSnapshot.id
         })
       );
       storeLength = Object.keys(store.getState().user.user).length;
     }
   } catch (err) {
     alert(`User info retrieval error: ${err}`);
   }
 }

 useEffect(() => {
  const unsub = onAuthStateChanged(
   auth,
   user => {
    if (user) {
      setCurrentUser(user);
      getUserInfo(user);
    } else {
      setCurrentUser(null);
    }
    setPending(false);
   },
   err => {
    alert(`Error: ${err}`);
    setPending(false);
   }
  );

  return unsub;
 }, []);

 if (pending) return null;

 if (currentUser) {
  return children;
 } else {
   return <Navigate to="/login" />;
 }
}