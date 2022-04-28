import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUpPage() {
 const [email, setEmail] = useState<string>('');
 const [password, setPassword] = useState<string>('');
 const [confirmPassword, setConfirmPassword] = useState<string>('');
 const auth = getAuth();

 const register = async (): Promise<any> => {
  if (password !== confirmPassword) return;
  try {
   await createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
   alert(`Registration error: ${err}`);
  }
 }

 return (
  <div className="field">
   <h2>Register:</h2>
   <input 
    type="email" 
    className="auth-input" placeholder='Email' 
    value={email} 
    onChange={(e) => {setEmail(e.target.value)}}
   />
   <input 
    type="password" 
    className="auth-input" placeholder='Password' 
    value={password} 
    onChange={(e) => {setPassword(e.target.value)}}
   />
   <input 
    type="password" 
    className="auth-input" placeholder='Confirm Password' 
    value={confirmPassword} 
    onChange={(e) => {setConfirmPassword(e.target.value)}}
   />
   <button className="auth-btn" onClick={register}>Register</button>
   <hr/>
   <Link to="/login">Click Here to Login</Link>
  </div>
 );
}