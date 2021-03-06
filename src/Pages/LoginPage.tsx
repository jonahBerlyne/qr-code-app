import React, { useState, useEffect } from 'react';
import "../Styles/Auth.css";
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage () {

 const [email, setEmail] = useState<string>('');
 const [password, setPassword] = useState<string>('');
 const auth = getAuth();

 const login = async (): Promise<any> => {
  try {
   await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
   alert(`Error: ${err}`);
  }
 }

 return (
  <div className="input-field">
   <h2 className='input-field-header'>Login:</h2>
   <input 
    type="email"
    data-testid="Email" 
    className="auth-input" 
    placeholder='Email' 
    value={email} 
    onChange={(e) => {setEmail(e.target.value)}}
    maxLength={30}
   />
   <input 
    type="password"
    data-testid="Password" 
    className="auth-input" placeholder='Password' 
    value={password} 
    onChange={(e) => {setPassword(e.target.value)}}
    maxLength={25}
   />
   <button data-testid="loginBtn" className="auth-btn btn btn-outline-info" onClick={login}>Login</button>
   <br />
   <Link to="/register" data-testid="register-link" className='link-info auth-link'>Click Here to Register</Link>
  </div>
 );
}