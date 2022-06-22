import React, { useState, useEffect } from 'react';
import "../Styles/Auth.css";
import { Link } from 'react-router-dom';
import fireDB, { auth } from '../firebaseConfig';
import { doc, collection, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUpPage() {
 const [email, setEmail] = useState<string>('');
 const [password, setPassword] = useState<string>('');
 const [confirmPassword, setConfirmPassword] = useState<string>('');

 const register = async (): Promise<any> => {
  if (password !== confirmPassword) return;
  try {
   const userCredential = await createUserWithEmailAndPassword(auth, email, password);
   const docRef = doc(fireDB, "users", `${userCredential.user.uid}`);
   const userDoc = {
    email,
    password
   };
   await setDoc(docRef, userDoc);
  } catch (err) {
   alert(`Registration error: ${err}`);
  }
 }

 return (
  <div className="input-field">
   <h2 className='input-field-header'>Register:</h2>
   <input 
    type="email"
    data-testid="Email" 
    className="auth-input" 
    placeholder='Email' 
    value={email} 
    onChange={(e) => {setEmail(e.target.value)}}
   />
   <input 
    type="password"
    data-testid="Password" 
    className="auth-input" placeholder='Password' 
    value={password} 
    onChange={(e) => {setPassword(e.target.value)}}
   />
   <input 
    type="password" 
    data-testid="confirmPassword"
    className="auth-input" 
    placeholder='Confirm Password' 
    value={confirmPassword} 
    onChange={(e) => {setConfirmPassword(e.target.value)}}
   />
   <button data-testid="registerBtn" className="auth-btn btn btn-outline-info" onClick={register}>Register</button>
   <hr/>
   <Link to="/login" data-testid="login-link" className='link-info auth-link'>Click Here to Login</Link>
  </div>
 );
}